using ChamgeLogSystem.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Entity
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

        [JsonIgnore]
        public User CreatedBy { get; set; }
    }
}
