using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class GovernorateRepository : IGovernorateRepository
    {
        private readonly DataContext _context;
        public GovernorateRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Governorate>> GetGovernoratesAsync()
        {
            return await _context.Governorates.ToListAsync();
        }

        public async Task<Governorate?> GetGovernorateAsync(int id)
        {
            return await _context.Governorates.FirstOrDefaultAsync(g => g.Id == id);
        }

        public Task<Governorate> GetGovernorateByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public bool GovernorateExists(int GovernorateId)
        {
            return _context.Governorates.Any(g => g.Id == GovernorateId);
        }
    }
}
