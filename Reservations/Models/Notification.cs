using System.ComponentModel.DataAnnotations.Schema;

namespace Reservations.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public  int? TeamId { get; set; } 
        public  int? ReservationId { get; set; } 
        public  int? FootballFieldId { get; set; } 


        public string? Text { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("FootballFieldId")]
        public FootballField FootballField { get; set; }

        [ForeignKey("ReservationId")]
        public Reservation Reservation { get; set; }

        [ForeignKey("TeamId")]
        public virtual Team Team { get; set; }
    }
}
