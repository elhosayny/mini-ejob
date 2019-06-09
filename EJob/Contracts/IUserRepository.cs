using System.Threading.Tasks;
using EJob.Models;
using Microsoft.AspNetCore.Identity;

namespace EJob.Contracts
{
    public interface IUserRepository
    {
        Task<IdentityResult> CreateAsync(UserModel userModel);
    }
}