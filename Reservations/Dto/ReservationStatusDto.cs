namespace Reservations.Dto
{
    public class ReservationStatusDto
    {
        public int Id { get; set; }
        public DateTime OpenAt { get; set; }
        public DateTime CloseAt { get; set; } = DateTime.Now;
    }
}
