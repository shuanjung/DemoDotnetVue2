using DemoDotnetVue2.Models.QueryResult;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using static System.Net.Mime.MediaTypeNames;

namespace DemoDotnetVue2.Controllers
{
    [Route("api/AuthorInfo", Name = "登入資訊接收")]
    [ApiController]
    public class AuthorInfoController1 : Controller
    {
        private readonly IConfiguration _configuration;
        public AuthorInfoController1(IConfiguration configuration)
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
        [HttpPost]
        public IActionResult GetUsersAuthor(AuthorInfo AuthorInfo)
        {
            string domainAndUsername = $"{AuthorInfo.Domain}\\{AuthorInfo.Account}";
            string userZone = QueryZone(AuthorInfo.Domain);
            string Authorsql = "SELECT GID,CNAME FROM SYS_USER";
            string AuthorsqlDataSource = userZone == "00"
                    ? _configuration.GetConnectionString("twwaterContext")
                    : _configuration.GetConnectionString("twwaterContext" + userZone);
            NpgsqlDataReader Reader;
            using (NpgsqlConnection conn = new(AuthorsqlDataSource))
            {
                conn.Open();
                using NpgsqlCommand Command = new(Authorsql, conn);
                Reader = Command.ExecuteReader();
                Reader.Close();
                conn.Close();
                if(Reader != null)
                {
                    return Ok("success");
                }
                else
                {
                    return Ok();
                }
            }
            
        }
    }
}
