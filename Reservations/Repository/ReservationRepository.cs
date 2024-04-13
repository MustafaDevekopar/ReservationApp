using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly DataContext _context;
        public ReservationRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Reservation>> GetReservationsAsync()
        {
            return await _context.Reservations.ToListAsync();
        }

        public async Task<Reservation?> GetReservationAsync(int id)
        {
            return await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Reservation>> GetReservationsOfUserAsync(int userId)
        {
            return await _context.Reservations.Where(r =>r.User.Id == userId).ToListAsync();
        }

        public async Task<List<Reservation>> GetReservationOfFieldAsync(int fieldId)
        {
            return await _context.Reservations.Where(r => r.FootballField.Id == fieldId).ToListAsync();
        }

        public bool ReservationExists(int id)
        {
            return _context.Reservations.Any(r => r.Id == id);
        }
    }
}
