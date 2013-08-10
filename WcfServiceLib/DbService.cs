using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceLib
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in both code and config file together.
    public class DbService : IDbService
    {
        //public string GetData(int value)
        //{
        //    return string.Format("You entered: {0}", value);
        //}

        //public CompositeType GetDataUsingDataContract(CompositeType composite)
        //{
        //    if (composite == null)
        //    {
        //        throw new ArgumentNullException("composite");
        //    }
        //    if (composite.BoolValue)
        //    {
        //        composite.StringValue += "Suffix";
        //    }
        //    return composite;
        //}
        private AdventureWorks2008R2Entities entities = new AdventureWorks2008R2Entities();

        public List<MyAddress> GetAddress(string city)
        {
            var a  = entities.Addresses.Where(c => c.City == city);

            List<MyAddress> list = new List<MyAddress>();
            foreach (var address in a)
            {
                list.Add(new MyAddress
                             {
                                 Address1 = address.AddressLine1,City = address.City
                             });
            }

            return list;
        }
    }
}
