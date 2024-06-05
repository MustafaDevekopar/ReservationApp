

using Microsoft.AspNetCore.Identity;

namespace Reservations.Models
{
    public class AppUser : IdentityUser
    {
        public int? UserId { get; set; } // مفتاح خارجي يشير إلى جدول User
        public int? FootballFieldId { get; set; } // مفتاح خارجي يشير إلى جدول FootballField

        public virtual User User { get; set; }
        public virtual FootballField FootballField { get; set; }

        // معلومات تسجيل الدخول الإضافية
        public string AccountType { get; set; } // يحدد نوع الحساب
    }
}
