using EJob.Contracts;
using EJob.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace EJob.Repositories
{
    public class UserRepository : IUserRepository
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public UserRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> CreateAsync(UserModel userModel)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = userModel.Username,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName
            };

            var result = await _userManager.CreateAsync(applicationUser, userModel.Password);
            return result;
        }
    }
}
