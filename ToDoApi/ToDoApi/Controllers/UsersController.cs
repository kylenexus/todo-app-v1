using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    public class UsersController : ApiController
    {
        private ToDoEntities db = new ToDoEntities();

        // GET: api/Users
        //public IQueryable<User> GetUsers()
        //{
        //    return db.Users;
        //}

        // GET: api/Users/5
        [ResponseType(typeof(UserOutput))]
        public IHttpActionResult GetUser(string token)
        {
            var userResponse = new UserOutput();

            User user = db.Users.Where(u=>u.rowguid.ToString().Equals(token)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            userResponse.userid = user.userid;
            userResponse.firstname = user.firstname;
            userResponse.lastname = user.lastname;
            userResponse.username = user.username;
            userResponse.token = user.rowguid.ToString();

            return Ok(userResponse);
        }

        // PUT: api/Users/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutUser(int id, User user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != user.userid)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(user).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (String.IsNullOrEmpty(user.firstname.Trim()) ||
                String.IsNullOrEmpty(user.lastname.Trim()) ||
                String.IsNullOrEmpty(user.username.Trim()) || 
                String.IsNullOrEmpty(user.password.Trim()) )
            {
                return BadRequest();
            }

            //check for duplicate username
            var checkDuplicate = db.Users.Where(u => u.username.Equals(user.username)).FirstOrDefault();

            if (checkDuplicate != null) {
                return Content(HttpStatusCode.Conflict, user);
            }

            user.rowguid = Guid.NewGuid();
            db.Users.Add(user);
            db.SaveChanges();

            //return CreatedAtRoute("DefaultApi", new { id = user.userid }, user);
            return Ok(user);
        }

        // DELETE: api/Users/5
        //[ResponseType(typeof(User))]
        //public IHttpActionResult DeleteUser(int id)
        //{
        //    User user = db.Users.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Users.Remove(user);
        //    db.SaveChanges();

        //    return Ok(user);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.userid == id) > 0;
        }
    }
}