namespace Reservations.Dto.Reservation
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

    }
}
