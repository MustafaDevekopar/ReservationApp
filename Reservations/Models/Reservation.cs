namespace Reservations.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
