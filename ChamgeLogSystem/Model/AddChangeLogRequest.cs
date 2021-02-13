using ChamgeLogSystem.Entity;
using ChamgeLogSystem.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Model
{
    public class AddChangeLogRequest
    {
        public string Title { get; set; }
        public LogType Type { get; set; }
        public string Content { get; set; }
        public int CreatedByUserId { get; set; }

        public ChangeLog ToChangeLog()
        {
            var log = new ChangeLog();
            log.Content = this.Content;
            log.Type = this.Type;
            log.Title = this.Title;
            log.CreatedByUserId = this.CreatedByUserId;
            log.CreatedDate = DateTime.Now;
            return log;
        }
    }

    public class UpdateChangeLogRequest
    {
        public int LogId { get; set; }
        public string Title { get; set; }
        public LogType Type { get; set; }
        public string Content { get; set; }
        public int CreatedByUserId { get; set; }

        public ChangeLog ToChangeLog()
        {
            var log = new ChangeLog();
            log.LogId = this.LogId;
            log.CreatedByUserId = this.CreatedByUserId;
            log.Content = this.Content;
            log.Type = this.Type;
            log.Title = this.Title;
            log.CreatedByUserId = this.CreatedByUserId;
            log.CreatedDate = DateTime.Now;
            return log;
        }
    }
}
