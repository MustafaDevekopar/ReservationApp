using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class ReservationStatusRepository : IReservationStatusRepository
    {
        private readonly DataContext _context;
        public ReservationStatusRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<ReservationStatus>> GetReservationStatusAsync()
        {
            return await _context.ReservationsStatus.ToListAsync();
        }

        public async Task<ReservationStatus?> GetReservationStatusByIdAsync(int id)
        {
            return await _context.ReservationsStatus.FirstOrDefaultAsync(x => x.Id == id);
        }

        public bool ReservationStatusExists(int rstatusId)
        {
            return _context.ReservationsStatus.Any(r => r.Id == rstatusId);
        }
    }
}
