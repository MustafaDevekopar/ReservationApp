namespace Reservations.Models
{
    public class ReservationBlock
    {
        public int Id { get; set; }
        public DateTime BlockAt { get; set; }
        public DateTime OpenAt { get; set; }
    }
}
