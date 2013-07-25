using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YouTubeMvc3.Models
{
    public class MySalesOrderHeader
    {
        public DateTime OrderDate { get; set; }
        public string Po { get; set; }
        public decimal TotalDue { get; set; }

    }
}