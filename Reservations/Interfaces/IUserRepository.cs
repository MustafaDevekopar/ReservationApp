using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserAsync(int userId);
        bool UserExists(int userId);
    }
}
