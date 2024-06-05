
using System.ComponentModel.DataAnnotations;

namespace Reservations.Dto.Account
{
    public class RegisterDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? AccountType { get; set; } // acountType == Role  
    }
}

