using LogView.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogView.Context
{
    public class ChangeLogContext: DbContext
    {
        public ChangeLogContext(DbContextOptions options)
           : base(options)
        {
        }
        public DbSet<ChangeLog> ChangeLogs { get; set; }

        
    }
}
