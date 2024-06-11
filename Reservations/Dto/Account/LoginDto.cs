using System.ComponentModel.DataAnnotations;

namespace Reservations.Dto.Account
{
    public class LoginDto
    {
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
