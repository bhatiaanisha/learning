using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.IServices;
using StackOverflow.Models;
using static StackOverflow.Enums.Enums;
using Microsoft.AspNetCore.Authorization;

namespace StackOverflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserservice Userservice { get; set; }
        public UserController(IUserservice userservice)
        {
            Userservice = userservice;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return await Userservice.GetAll();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAUser(int id)
        {
            return await Userservice.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> PostUser(UserRegisterDTO userRegisterDTO)
        {
            return await Userservice.RegisterUser(userRegisterDTO, UserType.User);
        }

        [HttpPost("admin")]
        public async Task<IActionResult> PostAdmin(UserRegisterDTO userRegisterDTO)
        {
            return await Userservice.RegisterUser(userRegisterDTO, UserType.Admin);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            return await Userservice.Delete(id);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateUser(int id, [FromBody] UserVM userVM)
        //{
        //    return await Userservice.Put(id, userVM);
        //}
    }
}
