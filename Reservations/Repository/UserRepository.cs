using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }
        public ICollection<FootballField> GetFieldsOfUser(int userId)
        {
            return _context.UserFields.Where(u => u.User.Id == userId)
                .Select(f => f.FootballField).ToList();
        }
        public bool CreateUser(User user)
        {
            _context.Users.Add(user);
            return Save();
        }
        public bool UserExists(int userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateUserFollowedField(UserField userField)
        {
            _context.UserFields.Add(userField);
            return Save();
        }
    }
}
