using System.DirectoryServices;
using Npgsql;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using DemoDotnetVue2.Models.QueryResult;
using System.Globalization;
using System;
//using System.Reflection.PortableExecutable;

namespace DemoDotnetVue2.Controllers
{
    [Route("api/Authorization", Name = "登入身分驗證")]
    [ApiController]
    public class AuthorizationController : Controller
    {
        private readonly IConfiguration _configuration;
        public AuthorizationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected string QueryZone(string zoneSelect)
        {
            return zoneSelect switch
            {
                "pubhq" => "00",
                "pub01" => "01",
                "pub02" => "02",
                "pub03" => "03",
                "pub04" => "04",
                "pub05" => "05",
                "pub06" => "06",
                "pub07" => "07",
                "pub08" => "08",
                "pub09" => "09",
                "pub10" => "10",
                "pub11" => "11",
                "pub12" => "12",
                // 北中南工處 預設為總處管理
                _ => "00"
            };
        }
        private readonly string LdapServer = "LDAP://OAHQDC5.water.gov.tw/";
        private readonly string LdapPath = "dc=water,dc=gov,dc=tw";
        private string _path;
        // POST: api/Authorization
        [HttpPost]
        public IActionResult GetUsersAuthorization(AuthorInfo AuthorInfo)
        {
            _path = LdapServer + LdapPath;
            string domainAndUsername = $"{AuthorInfo.Domain}\\{AuthorInfo.Account}";
            string userZone = QueryZone(AuthorInfo.Domain);
            DirectoryEntry entry;
            if (AuthorInfo.Account == "guest")
            {
                string Authorsql = "SELECT GID,CNAME FROM SYS_USER WHERE LOWER(ACCOUNT) = @ACCOUNT AND AUTH_ID LIKE '28'";
                string AuthorsqlDataSource = userZone == "00"
                    ? _configuration.GetConnectionString("twwaterContext")
                    : _configuration.GetConnectionString("twwaterContext" + userZone);
                NpgsqlDataReader Reader;
                IsAuthor result = null;
                using (NpgsqlConnection conn = new(AuthorsqlDataSource))
                {
                    conn.Open();
                    using NpgsqlCommand Command = new(Authorsql, conn);
                    Command.Parameters.AddWithValue("@ACCOUNT", AuthorInfo.Account.ToLower(CultureInfo.InvariantCulture));
                    using (Reader = Command.ExecuteReader())
                    {
                        if (Reader.HasRows && Reader.Read())
                        {
                            result = new IsAuthor
                            {
                                Tologin = "success",
                                Traceid = AEScode.AesEncryptBase64(Convert.ToString(Reader["Gid"], CultureInfo.InvariantCulture) + "," + QueryZone(AuthorInfo.Domain)),
                                Cname = Convert.ToString(Reader["cname"], CultureInfo.InvariantCulture)
                            };
                        }
                    }
                    Reader.Close();
                    conn.Close();
                }
                if (result != null)
                {
                    string sql = @"INSERT INTO LOGINFO(ACCOUNT,IP,LOGIN_TIME,STATUS,SYSTEM_NO,USER_ZONE) VALUES (@ACCOUNT,@IP,@LOGIN_TIME,@STATUS,@SYSTEM_NO,@USER_ZONE)";
                    string sqlDataSource = _configuration.GetConnectionString("twwaterContext");
                    DateTime Logindate = DateTime.Now;
                    string Ip = HttpContext.Request.HttpContext.Connection.RemoteIpAddress.ToString();
                    using (NpgsqlConnection conn = new(sqlDataSource))
                    {
                        conn.Open();
                        using NpgsqlCommand Command = new(sql, conn);
                        // 防注入
                        Command.Parameters.AddWithValue("@ACCOUNT", AuthorInfo.Account);
                        Command.Parameters.AddWithValue("@IP", Ip);
                        Command.Parameters.AddWithValue("@LOGIN_TIME", Logindate);
                        // STATUS 1 為登入
                        Command.Parameters.AddWithValue("@STATUS", "1");
                        // SYSTEM_NO 1 為行動版
                        Command.Parameters.AddWithValue("@SYSTEM_NO", "1");
                        Command.Parameters.AddWithValue("@USER_ZONE", userZone);
                        Command.ExecuteNonQuery();
                        Command.Dispose();
                        conn.Close();
                    }
                    HttpContext.Session.SetString("PLANACCOUNT", domainAndUsername);
                    return Ok(result);
                }
            }
            entry = AuthorInfo.Domain == "phbhq"
                ? new DirectoryEntry(_path, domainAndUsername, AuthorInfo.Password)
                : new DirectoryEntry(LdapServer + "dc=" + AuthorInfo.Domain + "," + LdapPath, domainAndUsername, AuthorInfo.Password);
            try
            {
                object obj = entry.NativeObject;
                DirectorySearcher search = new(entry);
                search.Filter = $"(SAMAccountName={AuthorInfo.Account})";
                search.PropertiesToLoad.Add("cn");
                SearchResult result = search.FindOne();
                if (result == null)
                {
                    HttpContext.Session.Clear();
                    return Ok(new { Tologin = "ADNoAuthorization" });
                }
                // Update the new path to the user in the directory.
                _path = result.Path;
                string _filterAttribute = (string)result.Properties["cn"][0];
            }
            catch
            {
                HttpContext.Session.Clear();
                return Ok(new { Tologin = "NoAuthorization" });
            }
            return Ok(new { Tologin = "success" });
        }
    }
}
