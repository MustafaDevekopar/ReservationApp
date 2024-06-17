using Reservations.Dto;
using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserAsync(int userId);
        Task<User> GetUserByUsernameAsync(string username);
        Task<int?> GetUserIdByUsername(string username);
        ICollection<FootballField> GetFieldsOfUser(int userId);
        bool CreateUserFollowedField(UserField userField);
        bool UserExists(int userId);
        bool UserExistsbyUsername(string username);
        
        bool CreateUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(User user);

        bool Save();
    }
}
