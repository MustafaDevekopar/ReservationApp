using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IViewRepository
    {
        decimal GetViewOfPostAsync(int postId);
        
    }
}
