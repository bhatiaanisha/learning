using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.Models;
using StackOverflow.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using static StackOverflow.Enums.Enums;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;

namespace StackOverflow.Services
{
    public class UserService : Repository<User>, IUserservice
    {
        public AppSettings _appSettings { get; set; }
        public UserService(StackOverflowDemoContext stackOverflowDemoContext, IOptions<AppSettings> appSettings) : base(stackOverflowDemoContext)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<IActionResult> RegisterUser(UserRegisterDTO userRegisterDTO, UserType userType)
        {
            if (await UserExists(userRegisterDTO.Email)) return new BadRequestObjectResult(new { ErrorMessage = "Email already exists!" });

            using var hmac = new HMACSHA512();

            var userdata = new User
            {
                DisplayName = userRegisterDTO.DisplayName,
                Email = userRegisterDTO.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userRegisterDTO.Password)),
                PasswordSalt = hmac.Key,
                Reputation = 0,
                UserType = (int)userType,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now
            };

            return await base.Post(userdata);
        }

        private async Task<bool> UserExists(string useremail)
        {
            return await _DbContext.Users.AnyAsync(x => x.Email == useremail);
        }

        public async Task<IActionResult> LoginUser(UserLoginDTO userLoginDTO)
        {
            var loginuser = await _DbContext.Users.SingleOrDefaultAsync(x => x.Email == userLoginDTO.Email);

            if (loginuser == null) return new UnauthorizedObjectResult(new { message = "Invalid Email" });

            using var hmac = new HMACSHA512(loginuser.PasswordSalt);

            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userLoginDTO.Password));

            if (!computedhash.SequenceEqual(loginuser.PasswordHash))
            {
                return new UnauthorizedObjectResult(new { message = "Invalid Password" });
            }

            var key = Encoding.ASCII.GetBytes(_appSettings.Key);
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email,loginuser.Email),
                new Claim(ClaimTypes.Role,((UserType)loginuser.UserType).ToString())
            };

            var signature = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var tokendescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(10),
                SigningCredentials = signature
            };

            var tokenhandler = new JwtSecurityTokenHandler();
            var token = tokenhandler.CreateToken(tokendescriptor);

            return new OkObjectResult(new { userId = loginuser.UserId, username = loginuser.DisplayName, token = tokenhandler.WriteToken(token), role = ((UserType)loginuser.UserType).ToString() });
        }

        //public async Task<IActionResult> PutUser(int id, UserVM userVM)
        //{
        //    return await base.Put(id, userVM);
        //}
    }
}
