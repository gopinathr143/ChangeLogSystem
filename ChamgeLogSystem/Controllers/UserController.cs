using ChamgeLogSystem.Entity;
using ChamgeLogSystem.Model;
using ChamgeLogSystem.Repository;
using ChamgeLogSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Controllers
{
    [Route("api/[controller]")]  
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private UserRepository _userRepository;
        private IAuthenticationSchemeProvider _authenticationSchemeProvider;

        public UsersController(IUserService userService, UserRepository userRepository, IAuthenticationSchemeProvider authenticationSchemeProvider)
        {
            _userService = userService;
            _userRepository = userRepository;
            _authenticationSchemeProvider = authenticationSchemeProvider;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model, ipAddress());

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = _userService.RefreshToken(refreshToken, ipAddress());

            if (response == null)
                return Unauthorized(new { message = "Invalid token" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }

        [HttpPost("revoke-token")]
        public IActionResult RevokeToken([FromBody] RevokeTokenRequest model)
        {
            // accept token from request body or cookie
            var token = model.Token ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token is required" });

            var response = _userService.RevokeToken(token, ipAddress());

            if (!response)
                return NotFound(new { message = "Token not found" });

            return Ok(new { message = "Token revoked" });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserRegisterationRequest request)
        {
            if (request == null)
            {
                return BadRequest("Log is null.");
            }
            if (this._userRepository.IsEmailExists(request.Email))
            {
                return BadRequest("Email exists already");
            }
            if (this._userRepository.IsUserNameExists(request.UserName)){
                return BadRequest("User Name exists already");
            }
            User user = request.toUserEntity();
            this._userRepository.Add(user);
            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpGet("{id}/refresh-tokens")]
        public IActionResult GetRefreshTokens(int id)
        {
            var user = _userService.GetById(id);
            if (user == null) return NotFound();

            return Ok(user.RefreshTokens);
        }

        [AllowAnonymous]
        [HttpGet("GetRegiserSocialLogin")]
        public async Task<IActionResult> GetRegiserSocialLogin()
        {
            var allSchemeProvider = (await this._authenticationSchemeProvider.GetAllSchemesAsync()).Select(m => m.DisplayName).Where(m => !string.IsNullOrEmpty(m));
            return Ok(allSchemeProvider);
        }

        [AllowAnonymous]
        [HttpPost("ExternalLogin")]
        public IActionResult ExternalLogin(ExternalLoginModel provider)
        {
            User user = null;
            if (provider == null)
            {
                return BadRequest("Invalid Data");
            }
            if (this._userRepository.IsEmailExists(provider.Email))
            {
                user = this._userRepository.FindByEmail(provider.Email);
            }
            else if (user == null)
            {
                user = provider.toUserEntity();
                this._userRepository.Add(user);
            }
            return Ok(this._userService.SocialAuthenticate(user, ipAddress()));
        }

        // helper methods

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
