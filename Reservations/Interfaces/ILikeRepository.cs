using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface ILikeRepository
    {
        decimal GetLikesOfPostAsync(int postId);
        Task<Like?> GetLikeAsync(int likeId);
        bool LikeExists(int likeId);
        bool CreateLike(Like like);
        bool DeleteLike(Like like);
        bool Save();
    }
}
