using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IGovernorateRepository
    {
        Task<List<Governorate>> GetGovernoratesAsync();
        Task<Governorate?> GetGovernorateAsync(int id);
        Task<Governorate> GetGovernorateByNameAsync(string name);
        bool CreateGovernorate(Governorate governorate);
        bool UpdateGovernorate(Governorate governorate);
        bool DeleteGovernorate(Governorate governorate);
        bool Save();
        bool GovernorateExists(int GovernorateId);
    }
}
