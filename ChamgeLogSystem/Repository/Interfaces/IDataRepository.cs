using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Repository.Interfaces
{
    public interface IDataRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(long id);
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
    }
}
