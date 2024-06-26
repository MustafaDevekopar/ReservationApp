﻿using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class ReservationBlockRepository : IReservationBlockRepository
    {
        private readonly DataContext _context;
        public ReservationBlockRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ReservationBlock>> GetReservationBlocksAsync()
        {
            return await _context.ReservationsBlock.ToListAsync();
        }

        public async Task<ReservationBlock?> GetReservationBlockAsync(int id)
        {
            return await _context.ReservationsBlock.FirstOrDefaultAsync(x => x.Id == id);
        }

        public bool ReservationBlockExists(int rblockId)
        {
            return _context.ReservationsBlock.Any(x => x.Id == rblockId);
        }

        public bool CreateReservationBlock(ReservationBlock reservationBlock)
        {
            _context.ReservationsBlock.Add(reservationBlock);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateReservationBlock(ReservationBlock reservationBlock)
        {
            _context.ReservationsBlock.Update(reservationBlock);
            return Save();
        }

        public bool DeleteReservationBlock(ReservationBlock reservationBlock)
        {
            _context.ReservationsBlock.Remove(reservationBlock);
            return Save();
        }
    }
}
