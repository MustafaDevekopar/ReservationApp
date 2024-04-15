using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IViewRepository
    {
        decimal GetViewOfPostAsync(int postId);
        bool CreateView(View view);
        bool Save();
        
    }
}
