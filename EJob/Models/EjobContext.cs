using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJob.Models
{
    public class EjobContext : DbContext
    {
        public EjobContext(DbContextOptions<EjobContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}
