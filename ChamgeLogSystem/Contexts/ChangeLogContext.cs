using ChamgeLogSystem.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Contexts
{
    public class ChangeLogContext : DbContext
    {
        public ChangeLogContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<ChangeLog> ChangeLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var user = new User
            {
                UserId = 1,
                FirstName = "Test",
                LastName = "User",
                UserName = "TestUser",
                Email = "testuser@gmail.com"
            };
            modelBuilder.Entity<User>().HasData(user);
        }
    }
}
