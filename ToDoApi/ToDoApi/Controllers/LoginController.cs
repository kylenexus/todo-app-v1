using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    public class LoginController : ApiController
    {
        private ToDoEntities db = new ToDoEntities();

        [HttpPost]
        public IHttpActionResult Login(LoginInput login) {

            if (String.IsNullOrWhiteSpace(login.username) ||
                String.IsNullOrEmpty(login.username) ||
                String.IsNullOrWhiteSpace(login.password) ||
                String.IsNullOrEmpty(login.password))
            {
                return BadRequest();
            }

            var user = db.Users.Where(u => u.username.Equals(login.username) && u.password.Equals(login.password)).FirstOrDefault();
            var response = new LoginOutput();

            if (user != null)
            {
                response.code = 200;
                response.message = "success";
                response.firstname = user.firstname;
                response.lastname = user.lastname;
                response.username = user.username;
                response.token = user.rowguid.ToString();

                return Ok(response);
            }

            response.code = 400;
            response.message = "User not found.";

            return Content(HttpStatusCode.NotFound, response);
        }
    }
}
