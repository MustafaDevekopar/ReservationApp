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
        bool FootballFieldExists(int FieldId);
        bool CreateFootballField(FootballField footballField);
        bool Save();
    }
}
