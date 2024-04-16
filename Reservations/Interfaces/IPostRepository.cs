using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IPostRepository
    {
        Task<List<Post>> GetPostsAsync();
        Task<List<Post>> GetPostsOfFieldAsync(int fieldId);
        Task<Post?> GetPostAsync(int id);
        bool PostExists(int postId);
        bool CreatePost(Post post);
        bool Save();
    }
}
