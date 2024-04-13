using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservationsAsync();
        Task<Reservation> GetReservationAsync(int id);
        Task<List<Reservation>> GetReservationsOfUserAsync(int userId);
        Task<List<Reservation>> GetReservationOfFieldAsync(int fieldId);
        bool ReservationExists(int id);
    }
}
