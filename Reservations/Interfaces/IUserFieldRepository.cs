using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IUserFieldRepository
    {
        Task <UserField> GetUserFieldAsync (int userId, int fieldId);
    }
}
