using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJob.Models
{
    public class EjobContext : IdentityDbContext
    {
        public EjobContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<ApplicationUser> Users { get; set; }
    }
}
