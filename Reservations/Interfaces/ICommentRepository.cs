using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetCommentsAsync();
        Task<List<Comment>> GetCommentsOfPostAsync(int fieldId);
        Task<Comment?> GetCommentAsync(int id);
        bool CommentExists(int commentId);
    }
}
