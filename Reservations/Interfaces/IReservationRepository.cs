using Reservations.Dto;
using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservationsAsync();
        Task<Reservation> GetReservationAsync(int id);
        Task<List<ReservationsWithFields>> GetReservationsOfUserAsync(int userId);
        Task<List<Reservation>> GetReservationOfFieldAsync(int fieldId);
        bool ReservationExists(int id);
        bool CreateReservation(Reservation reservation);
        bool DeleteReservation(Reservation reservation);
        bool Save();
    }
}
