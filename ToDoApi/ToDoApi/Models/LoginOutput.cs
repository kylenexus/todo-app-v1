using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoApi.Models
{
    public class LoginOutput
    {
        public int code { get; set; }
        public string message { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string username { get; set; }
        public string token { get; set; }
    }
}