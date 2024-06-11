
using System.ComponentModel.DataAnnotations;

namespace Reservations.Dto.Account
{
    public class NewUserDto
    {
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Token { get; set; }
    }
}
