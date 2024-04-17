using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IReservationStatusRepository
    {
        Task<List<ReservationStatus>> GetReservationStatusAsync();
        Task<ReservationStatus?> GetReservationStatusByIdAsync(int id);
        bool ReservationStatusExists(int rstatusId);
        bool CreareReservationStatus(ReservationStatus reservationStatus);
        bool UpdateReservationStatus(ReservationStatus reservationStatus);
        bool Save();
    }
}
