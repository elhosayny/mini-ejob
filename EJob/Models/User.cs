using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJob.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string LastLogin { get; set; }
    }
}
