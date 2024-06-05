using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IFootballFieldRepository
    {
        Task<List<FootballField>> GetFootballFieldsAsync();
        Task<FootballField?> GetFootballFieldAsync(int id);
        Task<FootballField> GetFootballFieldByNameAsync(string name);
        Task<Category> GetCategoryOfFieldAsync(int fieldId);
        Task<Governorate> GetGovernorateOfFieldAsync(int fieldId);
        Task<int?> GetFieldIdByUsername(string username);
        ICollection<User> GetUsersOfField(int fieldId);
        bool FootballFieldExists(int FieldId);
        bool FieldExixtsUsername(string username);// i arriveed hear
        bool CreateFootballField(FootballField footballField);
        bool UpdateFootBallField(FootballField footballField);
        bool Save();
    }
}
