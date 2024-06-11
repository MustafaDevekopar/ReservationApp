
using System.ComponentModel.DataAnnotations;

namespace Reservations.Dto.Account
{
    public class RegisterDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        [Phone]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? AccountType { get; set; } // AccountType == Role   
    }
}

