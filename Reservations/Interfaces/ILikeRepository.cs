using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface ILikeRepository
    {
        decimal GetLikesOfPostAsync(int postId);
        bool CreateLike(Like like);
        bool Save();
    }
}
