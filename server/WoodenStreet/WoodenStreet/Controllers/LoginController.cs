using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUserService _UserService { get; set; }

        public LoginController(IUserService userService)
        {
            _UserService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(UserLoginByPasswordDTO userLoginByPasswordDTO)
        {
            return await _UserService.LoginUserByPassword(userLoginByPasswordDTO);
        }
    }
}
