namespace Reservations.Models
{
    public class ReservationStatus
    {
        public int Id { get; set; }
        public DateTime OpenAt { get; set; }
        public DateTime CloseAt { get; set; } = DateTime.Now;

        public ICollection<FootballField> FootballFields { get; set;}
    }
}
