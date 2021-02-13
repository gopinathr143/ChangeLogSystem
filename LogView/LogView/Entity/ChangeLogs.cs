using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LogView.Entity
{
    public class ChangeLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LogId { get; set; }
        public string Title { get; set; }
        public LogType Type { get; set; }
        public string Content { get; set; }
        public int CreatedByUserId { get; set; }

        public DateTime CreatedDate { get; set; }
    }

    public enum LogType
    {
        NewRelease = 1,
        Update = 2,
        Fix = 3
    }
}
