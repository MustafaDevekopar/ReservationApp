namespace Reservations.Dto
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

    }
}
