namespace Reservations.Models
{
    public class UserField
    {
        public int UserId { get; set; }
        public int FieldId { get; set; }
        public User User { get; set; }
        public FootballField FootballField { get; set; }
    }
}
