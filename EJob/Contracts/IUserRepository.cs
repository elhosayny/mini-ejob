using EJob.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJob.Contracts
{
    public interface IUserRepository
    {
        Task<User> Add(User user);

        IEnumerable<User> GetAll();

        Task<User> Find(int id);

        Task<User> Update(User user);

        Task<User> RemoveAsync(int id);

        Task<bool> Exists(int id);

    }
}
