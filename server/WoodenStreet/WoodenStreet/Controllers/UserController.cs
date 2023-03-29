using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;
using static WoodenStreet.Enums.Enums;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _UserService { get; set; }

        public UserController(IUserService userService)
        {
            _UserService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return await _UserService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> PostUser(UserRegisterDTO userRegisterDTO)
        {
            return await _UserService.RegisterUser(userRegisterDTO, UserType.User);
        }

        [HttpPost("admin")]
        public async Task<IActionResult> PostAdmin(UserRegisterDTO userRegisterDTO)
        {
            return await _UserService.RegisterUser(userRegisterDTO, UserType.Admin);
        }
    }
}
