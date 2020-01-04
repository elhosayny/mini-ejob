using EJob.Contracts;
using EJob.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EJob.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("Register")]
        //POST : api/User/Register
        public async Task<Object> RegisterAsync(UserModel userModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _userRepository.CreateAsync(userModel);
                return Ok(result);
            }
            else return BadRequest("Invalid data");
        }

        [HttpPost]
        [Route("Login")]
        //POST : api/User/Login
        public async Task<Object> LoginAsync(LoginModel loginModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _userRepository.LoginAsync(loginModel);
                if (result == null)
                    return BadRequest("Username or password is incorrect");

                return Ok(new { token = result });
            }
            else return BadRequest("Invalid data");
        }

    }
}