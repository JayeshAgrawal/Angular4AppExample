using System;
using System.Collections.Generic;
using angular_webapi_example.DbContext;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace angular_webapi_example.Controllers
{
    public class ContactApiController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(ContactDB.tblContacts.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]tblContact value)
        {
            ContactDB.tblContacts.Add(value);
            return ToJson(ContactDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]tblContact value)
        {
            ContactDB.Entry(value).State = EntityState.Modified;
            return ToJson(ContactDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            ContactDB.tblContacts.Remove(ContactDB.tblContacts.FirstOrDefault(x => x.id == id));
            return ToJson(ContactDB.SaveChanges());
        }
    }
}
