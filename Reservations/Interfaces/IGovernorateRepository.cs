using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IGovernorateRepository
    {
        Task<List<Governorate>> GetGovernoratesAsync();
        Task<Governorate?> GetGovernorateAsync(int id);
        Task<Governorate> GetGovernorateByNameAsync(string name);
        bool GovernorateExists(int GovernorateId);
    }
}
