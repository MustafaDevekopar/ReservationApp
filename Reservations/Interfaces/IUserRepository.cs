using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserAsync(int userId);
        ICollection<FootballField> GetFieldsOfUser(int userId);
        bool CreateUserFollowedField(UserField userField);
        bool UserExists(int userId);
        bool CreateUser(User user);
        bool Save();
    }
}
