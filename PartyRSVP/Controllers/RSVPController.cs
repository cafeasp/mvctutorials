using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PartyRSVP.Models;

namespace PartyRSVP.Controllers
{
    public class RSVPController : Controller
    {
        //
        // GET: /RSVP/

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(GuestRespond guestRespond)
        {
            if (ModelState.IsValid)
            {
                if (guestRespond.Attend.Value)
                    return RedirectToAction("Thanks");
                else return View("Sorry");
            }
            return View(guestRespond);
        }
        public ActionResult Thanks()
        {
            return View();
        }
    }
}
