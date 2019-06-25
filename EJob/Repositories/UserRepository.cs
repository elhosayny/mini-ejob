using EJob.Contracts;
using EJob.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EJob.Repositories
{
    public class UserRepository : IUserRepository
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSetting _applicationSetting;

        public UserRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,IOptions<ApplicationSetting> options)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationSetting = options.Value;
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
        
        public async Task<string> LoginAsync(LoginModel loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.Username);
            if(user != null && await _userManager.CheckPasswordAsync(user,loginModel.Password))
            {
                var key = Encoding.UTF8.GetBytes(_applicationSetting.JwtKey);

                var tokenDescription = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserID",user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescription);
                var token = tokenHandler.WriteToken(securityToken);
                return token; 
            }
            else
            {
                return null;
            }
        }
    }
}
