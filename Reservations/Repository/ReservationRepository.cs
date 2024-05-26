using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto;
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

        public async Task<List<ReservationsWithFields>> GetReservationsOfUserAsync(int userId)
        {
            //return await _context.Reservations.Where(r =>r.User.Id == userId).ToListAsync();
            var reservation = await _context.Reservations
                                   .Where(u => u.User.Id == userId)
                                   .Include(f => f.FootballField)
                                   .ToListAsync();
            var res = reservation.Select(c => new ReservationsWithFields
            {
                Id = c.Id,
                DateTime = c.DateTime,
                Fields = new FieldOfReservationDto
                {
                    Id = c.FootballField.Id,
                    Name = c.FootballField.Name,
                    Username = c.FootballField.Username,
                    PhoneNumbr = c.FootballField.PhoneNumbr,
                }
            }).ToList();
            return res;

        }

        public async Task<List<Reservation>> GetReservationOfFieldAsync(int fieldId)
        {
            return await _context.Reservations.Where(r => r.FootballField.Id == fieldId).ToListAsync();
        }

        public bool ReservationExists(int id)
        {
            return _context.Reservations.Any(r => r.Id == id);
        }

        public bool CreateReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool DeleteReservation(Reservation reservation)
        {
            _context.Reservations.Remove(reservation);
            return Save();
        }
    }
}
