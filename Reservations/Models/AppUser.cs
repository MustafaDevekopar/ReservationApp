

using Microsoft.AspNetCore.Identity;

namespace Reservations.Models
{
    public class AppUser : IdentityUser
    {
        public int? UserId { get; set; } 
        public int? FootballFieldId { get; set; } 

        public virtual User User { get; set; }
        public virtual FootballField FootballField { get; set; }

        public string AccountType { get; set; } // يحدد نوع الحساب
    }
}
