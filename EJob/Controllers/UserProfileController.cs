using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJob.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJob.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private IUserRepository _userRepository;

        public UserProfileController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Authorize]
        //GET : api/UserProfile
        public async Task<object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userRepository.FindByIdAsync(userId);
            return new
            {
                user.UserName,
                user.FirstName,
                user.LastName,
                user.Email
            };
        }
    }
}