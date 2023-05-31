using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Globalization;
using DemoDotnetVue2.Models.QueryResult;

namespace DemoDotnetVue2.Controllers
{
    [Route("api/MapfileQuery", Name = "查詢區域範圍map檔")]
    [ApiController]
    public class MapfileQueryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public MapfileQueryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET: api/MapfileQuery
        [HttpGet("{X1}/{X2}/{Y1}/{Y2}")]
        public IActionResult GetMapFile(double X1, double X2, double Y1, double Y2)
        {
            string sessionLogin = HttpContext.Session.GetString("PLANLOGIN");

            if (sessionLogin == "success")
            {
                string sql = @"SELECT ARRAY_TO_STRING(ARRAY_AGG(DISTINCT WT_ID), ',') AS WT_ID FROM ADMIN WHERE ST_INTERSECTS(ST_GEOMFROMTEXT('POLYGON(('||@PolyString||'))', 4326), THE_GEOM)";
                string sqlDataSource = _configuration.GetConnectionString("twwaterContext");
                NpgsqlDataReader Reader;
                MapFile result = null;
                using (NpgsqlConnection conn = new(sqlDataSource)) 
                {
                    conn.Open();
                    using NpgsqlCommand Command = new(sql, conn);
                    // 防注入
                    string PolyString = $"{X2} {Y2},{X2} {Y1},{X1} {Y1},{X1} {Y2},{X2} {Y2}";
                    Command.Parameters.AddWithValue("@PolyString", PolyString);
                    using (Reader = Command.ExecuteReader())
                    {
                        if (Reader.HasRows && Reader.Read())
                        {
                            result = new MapFile
                            {
                                WT_ID = Convert.ToString(Reader["WT_ID"], CultureInfo.InvariantCulture)
                            };
                        }
                    }
                    Reader.Close();
                    conn.Close();
                }
                return Ok(result);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
