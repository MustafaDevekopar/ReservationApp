namespace Reservations.Models
{
    public class FootballField
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public decimal PhoneNumbr { get; set; }
        public string Governorate { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Category Category { get; set; }
        public Governorate governorate { get; set; }
        public City city { get; set; }
        public ReservationStatus ReservationStatus { get; set; }
        public ReservationBlock ReservationBlock { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
