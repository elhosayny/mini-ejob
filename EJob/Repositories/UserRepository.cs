using EJob.Contracts;
using EJob.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJob.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly EjobContext _context;

        public UserRepository(EjobContext context)
        {
            _context = context;
        }

        public async Task<User> Add(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> Exists(int id)
        {
            return await _context.Users.AnyAsync(x => x.Id == id);    
        }

        public async Task<User> Find(int id)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public async Task<User> RemoveAsync(int id)
        {
            var user = await _context.Users.SingleAsync(x=>x.Id == id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return user;
            
        }

        public async Task<User> Update(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
