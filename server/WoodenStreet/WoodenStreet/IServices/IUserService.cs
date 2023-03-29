using Microsoft.AspNetCore.Mvc;
using WoodenStreet.Models;
using static WoodenStreet.Enums.Enums;

namespace WoodenStreet.IServices
{
    public interface IUserService : IRepository<User>
    {
        public Task<IActionResult> RegisterUser(UserRegisterDTO userRegisterDTO, UserType userType);

        public Task<IActionResult> LoginUserByPassword(UserLoginByPasswordDTO userLoginByPasswordDTO);

        public Task<IActionResult> LoginUserByOtp(UserLoginByOtpDTO userLoginByOtpDTO);
    }
}
