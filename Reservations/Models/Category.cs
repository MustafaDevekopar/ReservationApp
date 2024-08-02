namespace Reservations.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<FootballField> FootballFields { get; set;}
    }
}
