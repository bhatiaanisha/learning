using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StackOverflow.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.Models;

namespace StackOverflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUserservice _Userservice { get; set; }
        public LoginController(IUserservice userservice)
        {
            _Userservice = userservice;
        }

        [HttpPost]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        {
            return await _Userservice.LoginUser(userLoginDTO);
        }
    }
}
