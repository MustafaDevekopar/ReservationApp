using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
