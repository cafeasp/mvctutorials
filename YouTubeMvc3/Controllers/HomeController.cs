using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace YouTubeMvc3.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult About(string roleName)
        {
            System.Web.Security.Roles.CreateRole(roleName);
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult AddUserRole(string user)
        {
            System.Web.Security.Roles.AddUserToRole(user,"Members");
            return View("About");
        }

        [Authorize(Roles = "Members")]
        public ActionResult Members()
        {
            return View();
        }

        
        public ActionResult AjaxPage()
        {
            return View();
        }

        [HttpPost]
        public JsonResult MyajaxCall(string order)
        {
            return Json("ok");
        }
        
        public ActionResult FancyBoxExample()
        {
            return View();
        }
    }
}
