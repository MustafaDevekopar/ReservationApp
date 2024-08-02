namespace Reservations.Models
{
    public class Governorate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        //public ICollection<City> Cities { get; set; }
        public ICollection<FootballField> FootballFields { get; set; }
    }
}
