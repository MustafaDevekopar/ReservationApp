using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class UserFieldRepository : IUserFieldRepository
    {
        private readonly DataContext _context;
        public UserFieldRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<UserField> GetUserFieldAsync(int userId, int fieldId)
        {
            return await _context.UserFields
                .Where(uf => uf.UserId == userId && uf.FieldId == fieldId)
                .FirstOrDefaultAsync();
        }
    }
}
