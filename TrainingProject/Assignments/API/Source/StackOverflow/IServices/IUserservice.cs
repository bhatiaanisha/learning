using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StackOverflow.Models;
using static StackOverflow.Enums.Enums;
//using static StackOverflow.Enums.Enums;

namespace StackOverflow.IServices
{
    public interface IUserservice : IRepository<User>
    {
        public Task<IActionResult> RegisterUser(UserRegisterDTO userRegisterDTO, UserType userType);
        public Task<IActionResult> LoginUser(UserLoginDTO userLoginDTO);

        //public Task<IActionResult> PutUser(int id, UserVM userVM);
    }
}
