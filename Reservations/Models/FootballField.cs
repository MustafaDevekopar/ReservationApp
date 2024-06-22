namespace Reservations.Models
{
    public class FootballField
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Username { get; set; }
        public string? Biography { get; set; }
        public string? Location { get; set; }
        public byte[]? Avatar { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Category Category { get; set; }
        public Governorate Governorate { get; set; }
        public int? OpeningDays { get; set; } = 7;
        public string? OpeningHouer { get; set; }
        //public List<string>? OpeningHouer { get; set; } //= new List<string> { "09:00", "10:00", "11:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" };
        public ReservationStatus ReservationStatus { get; set; }
        public ReservationBlock ReservationBlock { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<UserField> UserFields { get; set; }

        public virtual AppUser AppUser { get; set; }


    }
}

