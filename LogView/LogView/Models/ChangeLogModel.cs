using LogView.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LogView.Models
{
    public class ChangeLogModel
    {
        public int LogId { get; set; }

        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "Log Type")]
        public string Type { get; set; }

        [Display(Name = "Content")]
        public string Content { get; set; }

        [Display(Name = "Date")]
        public DateTime CreatedDate { get; set; }


        [Display(Name = "Color")]
        public string Color { get; set; }

        public ChangeLogModel ToChangeLogModel(ChangeLog changeLog)
        {
            this.LogId = changeLog.LogId;
            this.Title = changeLog.Title;
            GetLogType(changeLog.Type);
            this.Content = changeLog.Content;
            this.CreatedDate = changeLog.CreatedDate;
            return this;
        }
        private void GetLogType(LogType type)
        {
            switch (type)
            {
                case LogType.NewRelease:
                    this.Type =  "New Release";
                    this.Color = "blue";
                    break;
                case LogType.Update:
                    this.Type = "Update";
                    this.Color = "green";
                    break;
                case LogType.Fix:
                    this.Type = "Fix";
                    this.Color = "red";
                    break;               
            }
        }
    }
}
