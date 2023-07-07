using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DemoDotnetVue2.Models.QueryResult;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DemoDotnetVue2.Controllers
{
    [Route("api/Polate", Name = "經緯度查詢高程")]
    [ApiController]
    public class PolateController : Controller
    {
        private readonly PolateService _polateService;
        public PolateController(PolateService polateService)
        {
            _polateService = polateService;
        }

        [HttpGet("{longLatX}/{longLatY}")]
         public async Task<IActionResult> GetPolateInfo(string longLatX, string longLatY)
        {
            try
            {
                string sessionLogin = HttpContext.Session.GetString("PLANLOGIN");
                // var sessionACCOUNT = HttpContext.Session.GetString("PLANACCOUNT");
                if (sessionLogin == "success")
                {
                    PolateInfo PolateInfo = JsonConvert.DeserializeObject<PolateInfo>(await _polateService.GetPolateService(longLatX, longLatY));
                    return Ok(PolateInfo);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch
            {
                List<PointArray> result = new()
                {
                    new PointArray { X = "", Y = "", Z = "查無高程值!"}
                };
                return Ok(new PolateInfo { count = "", PointArray = result });
            }
        }
    }
}
