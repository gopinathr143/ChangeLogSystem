using ChamgeLogSystem.Contexts;
using ChamgeLogSystem.Entity;
using ChamgeLogSystem.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Repository
{
    public class UserRepository : IDataRepository<User>
    {
        readonly ChangeLogContext _changeLogContext;
        public UserRepository(ChangeLogContext context)
        {
            _changeLogContext = context;
        }
        public IEnumerable<User> GetAll()
        {
            return _changeLogContext.Users.AsEnumerable<User>();
        }
        public User Get(long id)
        {
            return _changeLogContext.Users
                  .FirstOrDefault(e => e.UserId == id);
        }
        public void Add(User entity)
        {
            _changeLogContext.Users.Add(entity);
            _changeLogContext.SaveChanges();
        }
        public void Update(User entity)
        {
            var user = _changeLogContext.Users.Find(entity.UserId);
            if (user != null)
            {
                user.FirstName= entity.FirstName;
                user.LastName = entity.LastName;
                _changeLogContext.SaveChanges();
            }
        }
        public void Delete(User user)
        {
            _changeLogContext.Users.Remove(user);
            _changeLogContext.SaveChanges();
        }

        public bool IsEmailExists(string email)
        {
            var user = _changeLogContext.Users.FirstOrDefault(x=>x.Email.ToLower()==email.ToLower());
            return user != null;
        }

        public bool IsUserNameExists(string userName)
        {
            var user = _changeLogContext.Users.FirstOrDefault(x => x.UserName.ToLower() == userName.ToLower());
            return user != null;
        }

        public User FindByEmail(string email)
        {
            return _changeLogContext.Users.SingleOrDefault(u => u.Email.ToLower() == email.ToLower());
        }
    }
}
