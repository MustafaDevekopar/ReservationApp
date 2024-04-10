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
    }
}
