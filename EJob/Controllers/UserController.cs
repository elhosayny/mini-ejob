using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJob.Contracts;
using EJob.Models;
using EJob.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<Object> PostUser(UserModel userModel)
        {
            try
            {
                var result = await _userRepository.CreateAsync(userModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}