using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WoodenStreet.IServices;
using WoodenStreet.Models;
using static WoodenStreet.Enums.Enums;

namespace WoodenStreet.Services
{
    public class UserService : Repository<User>, IUserService
    {
        public AppSettings _appSettings { get; set; }
        public UserService(WoodenStreetContext woodenStreetContext, IOptions<AppSettings> appSettings) : base(woodenStreetContext)
        {
            _appSettings = appSettings.Value;
        }
        public async Task<IActionResult> RegisterUser(UserRegisterDTO userRegisterDTO, UserType userType)
        {
            if (await UserExists(userRegisterDTO.UserName)) return new BadRequestObjectResult(new { ErrorMessage = "Username already exists!" });

            using var hmac = new HMACSHA512();

            var userdata = new User
            {
                UserName = userRegisterDTO.UserName,
                MobileNumber = userRegisterDTO.MobileNumber,
                PinCode = userRegisterDTO.PinCode,
                Email = userRegisterDTO.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userRegisterDTO.Password)),
                PasswordSalt = hmac.Key,
                UserType = (int)userType,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
            };

            return await base.Post(userdata);
        }

        private async Task<bool> UserExists(string username)
        {
            return await _DbContext.Users.AnyAsync(x => x.UserName == username);
        }

        public async Task<IActionResult> LoginUserByPassword(UserLoginByPasswordDTO userLoginByPasswordDTO)
        {
            var loginuser = await _DbContext.Users.SingleOrDefaultAsync(x => x.Email == userLoginByPasswordDTO.Email);

            if(loginuser == null) 
            {
                return new UnauthorizedObjectResult(new { message = "Invalid Email" });
            }

            using var hmac = new HMACSHA512(loginuser.PasswordSalt);

            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userLoginByPasswordDTO.Password));

            if(!computedhash.SequenceEqual(loginuser.PasswordHash))
            {
                return new UnauthorizedObjectResult(new { message = "Invalid Password!" });
            }

            var key = Encoding.ASCII.GetBytes(_appSettings.Key);
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name,loginuser.UserName),
                new Claim(ClaimTypes.Email,userLoginByPasswordDTO.Email),
                new Claim(ClaimTypes.Role,((UserType)loginuser.UserType).ToString())
            };

            var signature = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var tokendescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = signature
            };

            var tokenhandler = new JwtSecurityTokenHandler();
            var token = tokenhandler.CreateToken(tokendescriptor);

            return new OkObjectResult(new { userId = loginuser.UserId, userName = loginuser.UserName, email = userLoginByPasswordDTO.Email, role = ((UserType)loginuser.UserType).ToString(), token = tokenhandler.WriteToken(token) });
        }

        public Task<IActionResult> LoginUserByOtp(UserLoginByOtpDTO userLoginByOtpDTO)
        {
            throw new NotImplementedException();
        }
    }
}
