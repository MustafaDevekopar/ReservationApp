using Reservations.Dto;
using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface IPostRepository
    {
        Task<List<PostWithFieldGetDto>> GetPostsAsync();
        Task<List<Post>> GetPostsOfFieldAsync(int fieldId);
        Task<Post?> GetPostAsync(int id);
        Task<FootballField> GetFootballFieldOfPostAsync(int postid);
        bool PostExists(int postId);
        bool CreatePost(Post post);
        bool UpdatePost(Post post);
        bool DeletePost(Post post);
        bool Save();
    }
}
