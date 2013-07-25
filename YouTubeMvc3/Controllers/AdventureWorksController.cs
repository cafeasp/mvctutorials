using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using YouTubeMvc3.Db;
using YouTubeMvc3.Models;

namespace YouTubeMvc3.Controllers
{
    public class AdventureWorksController : ApiController
    {
        // GET api/<controller>
        public List<MySalesOrderHeader> GetAllSalesOrders()
        {
            var db = new AdventureDbContainer();
            List<MySalesOrderHeader> myList = new List<MySalesOrderHeader>();
            foreach (var salesOrder in db.SalesOrderHeaders.Take(3).ToList())
            {
                myList.Add(new MySalesOrderHeader
                               {
                                   OrderDate = salesOrder.OrderDate,
                                   Po = salesOrder.PurchaseOrderNumber,
                                   TotalDue = salesOrder.TotalDue
                               });
            }
            return myList;
        }

        // GET api/<controller>/5
        public MySalesOrderHeader GetSalesOrder(int id)
        {
            var db = new AdventureDbContainer();
            var dbOrder = db.SalesOrderHeaders.FirstOrDefault(c=>c.SalesOrderID ==id);
            var myOrder = new MySalesOrderHeader();
            myOrder.OrderDate = dbOrder.OrderDate;
            myOrder.Po = dbOrder.PurchaseOrderNumber;
            myOrder.TotalDue = dbOrder.TotalDue;

            return myOrder;
        }

        // POST api/<controller>
        public void Post(YouTubeWebApi value)
        {
            var db = new AdventureDbContainer();
            db.YouTubeWebApi.AddObject(new YouTubeWebApi
                                           {
                                               Name = value.Name,
                                               Department = value.Department
                                           });
            db.SaveChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}