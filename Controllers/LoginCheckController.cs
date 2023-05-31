using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoDotnetVue2.Controllers
{
    [Route("api/LoginCheck", Name = "登入驗證")]
    [ApiController]
    public class LoginCheckController : Controller
    {
        // POST: api/LoginCheck
        [HttpPost]
        public IActionResult IsLogin()
        {
            string sessionACCOUNT = HttpContext.Session.GetString("PLANACCOUNT");
            if (sessionACCOUNT != null)
            {
                HttpContext.Session.SetString("PLANLOGIN", "success");
                return Ok(true);
            }
            else
            {
                HttpContext.Session.SetString("PLANLOGIN", "failed");
                return Ok(false);
            }
        }
    }
}
