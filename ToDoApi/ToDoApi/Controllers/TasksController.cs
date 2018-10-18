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
    public class TasksController : ApiController
    {
        private ToDoEntities db = new ToDoEntities();

        // GET: api/Tasks
        public IQueryable<Task> GetTasks(string token)
        {
            IQueryable<Task> tasks;

            var user = db.Users.FirstOrDefault(u => u.rowguid.ToString().Equals(token));

            if (user != null)
            {
                tasks = db.Tasks.Where(u => u.userid == user.userid);
                return tasks;
            }
            else
                tasks = db.Tasks.DefaultIfEmpty();


            return tasks;
        }

        //// GET: api/Tasks/5
        //[ResponseType(typeof(Task))]
        //public IHttpActionResult GetTask(int id)
        //{
        //    Task task = db.Tasks.Find(id);
        //    if (task == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(task);
        //}

        // PUT: api/Tasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTask(string token, int taskid, Task task)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            if (taskid != task.taskid)
            {
                return BadRequest();
            }

            //db.Entry(task).State = EntityState.Modified;

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!TaskExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            var user = db.Users.Where(u => u.rowguid.ToString().Equals(token)).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            Task chkTask = db.Tasks.Where(u => u.userid == user.userid && u.taskid == taskid).FirstOrDefault();
            if (task == null)
            {
                return NotFound();
            }

            chkTask.done = task.done;
            chkTask.task1 = task.task1;

            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tasks
        [ResponseType(typeof(Task))]
        public IHttpActionResult PostTask(string token, Task task)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var user = db.Users.Where(u => u.rowguid.ToString().Equals(token)).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            task.done = false;
            task.userid = user.userid;

            db.Tasks.Add(task);
            db.SaveChanges();

            return Ok(task);
        }

        // DELETE: api/Tasks/5
        [ResponseType(typeof(Task))]
        public IHttpActionResult DeleteTask(string token, int taskid)
        {

            var user = db.Users.Where(u => u.rowguid.ToString().Equals(token)).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            Task task = db.Tasks.Where(u=>u.userid==user.userid && u.taskid==taskid).FirstOrDefault();
            if (task == null)
            {
                return NotFound();
            }

            db.Tasks.Remove(task);
            db.SaveChanges();

            return Ok(task);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaskExists(int id)
        {
            return db.Tasks.Count(e => e.taskid == id) > 0;
        }
    }
}