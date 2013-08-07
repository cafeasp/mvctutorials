using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.ServiceModel.Syndication;
using System.Web.Http;

namespace PartyRSVP.Controllers
{
    public class RssFeedController : ApiController
    {
      
        public Rss20FeedFormatter GetFeed()
        {
            var feed = new SyndicationFeed("My Blog RSS Feed", "This is a test feed", new Uri("http://rsvpestrella.us"));
            feed.Authors.Add(new SyndicationPerson("someone@rsvpestrella.com"));
            feed.Categories.Add(new SyndicationCategory("How To Sample Code"));
            feed.Description = new TextSyndicationContent("This is a how to sample that demonstrates how to expose a feed using RSS with WCF");

            SyndicationItem item1 = new SyndicationItem(
                "Item One",
                "This is the content for item one",
                new Uri("http://localhost/Content/One"),
                "ItemOneID",
                DateTime.Now);

            SyndicationItem item2 = new SyndicationItem(
                "Item Two",
                "This is the content for item two",
                new Uri("http://localhost/Content/Two"),
                "ItemTwoID",
                DateTime.Now);

            SyndicationItem item3 = new SyndicationItem(
                "Item Three",
                "This is the content for item three",
                new Uri("http://localhost/Content/three"),
                "ItemThreeID",
                DateTime.Now);

            List<SyndicationItem> items = new List<SyndicationItem>();

            items.Add(item1);
            items.Add(item2);
            items.Add(item3);

            feed.Items = items;

            return new Rss20FeedFormatter(feed);
        }

        
        public Atom10FeedFormatter GetFeed(int id)
        {
            SyndicationFeed feed = new SyndicationFeed("Atom Feed", "This is a test feed", new Uri("http://SomeURI"), "FeedOneID", new DateTimeOffset(DateTime.Now));
            feed.Authors.Add(new SyndicationPerson("someone@coffee.com"));
            feed.Categories.Add(new SyndicationCategory("How To Sample Code"));
            feed.Description = new TextSyndicationContent("This is a sample that illistrates how to expose a feed using ATOM with WCF");

            SyndicationItem item1 = new SyndicationItem(
                "Item One",
                "This is the content for item one",
                new Uri("http://localhost/Content/One"),
                "ItemOneID",
                DateTime.Now);

            SyndicationItem item2 = new SyndicationItem(
                "Item Two",
                "This is the content for item two",
                new Uri("http://localhost/Content/Two"),
                "ItemTwoID",
                DateTime.Now);

           
            List<SyndicationItem> items = new List<SyndicationItem>();

            items.Add(item1);
            items.Add(item2);
       

            feed.Items = items;
            return new Atom10FeedFormatter(feed);
        }
    }
}
