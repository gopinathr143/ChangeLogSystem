using ChamgeLogSystem.Contexts;
using ChamgeLogSystem.Entity;
using ChamgeLogSystem.Repository;
using ChamgeLogSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Repository
{
    public class ChangeLogRepository : IDataRepository<ChangeLog>
    {
        readonly ChangeLogContext _changeLogContext;
        public ChangeLogRepository(ChangeLogContext context)
        {
            _changeLogContext = context;
        }
        public IEnumerable<ChangeLog> GetAll()
        {
            return _changeLogContext.ChangeLogs.AsEnumerable<ChangeLog>();
        }
        public ChangeLog Get(long id)
        {
            return _changeLogContext.ChangeLogs
                  .FirstOrDefault(e => e.LogId == id);
        }
        public void Add(ChangeLog entity)
        {
            _changeLogContext.ChangeLogs.Add(entity);
            _changeLogContext.SaveChanges();
        }
        public void Update(ChangeLog entity)
        {
            var changelog = _changeLogContext.ChangeLogs.Find(entity.LogId);
            if (changelog != null)
            {
                changelog.Title = entity.Title;
                changelog.Content = entity.Content;
                changelog.Type = entity.Type;
                _changeLogContext.SaveChanges();
            }
        }
        public void Delete(ChangeLog changeLog)
        {
            _changeLogContext.ChangeLogs.Remove(changeLog);
            _changeLogContext.SaveChanges();
        }
    }
}
