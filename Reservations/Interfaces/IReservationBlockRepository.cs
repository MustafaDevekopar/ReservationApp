﻿using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IReservationBlockRepository
    {
        Task<List<ReservationBlock>> GetReservationBlocksAsync();
        Task<ReservationBlock?> GetReservationBlockAsync(int id);
        bool ReservationBlockExists(int rblockId);
        bool CreateReservationBlock(ReservationBlock reservationBlock);
        bool UpdateReservationBlock(ReservationBlock reservationBlock);
        bool DeleteReservationBlock(ReservationBlock reservationBlock);
        bool Save();
    }
}
