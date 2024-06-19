namespace Reservations.Dto.Reservation
{
    public class ReservationsWithFields
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
        public FieldOfReservationDto Fields { get; set; }
    }
}
