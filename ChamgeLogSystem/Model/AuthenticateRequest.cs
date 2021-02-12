using ChamgeLogSystem.Entity;
using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Model
{
    public class AuthenticateRequest
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class UserRegisterationRequest
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User toUserEntity()
        {
            var user = new User();
            user.Email = this.Email;
            user.UserName = this.UserName;
            user.FirstName = this.FirstName;
            user.LastName = this.LastName;
            user.Password = this.Password;
            return user;
        }
    }

    public class ExternalLoginModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public User toUserEntity()
        {
            var user = new User();
            user.Email = this.Email;
            user.UserName = this.UserName;
            user.FirstName = this.FirstName;
            user.LastName = this.LastName;
            return user;
        }
    }

}
