using Reservations.Dto.Comment;
using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetCommentsAsync();
        Task<List<CommentsWithUser>> GetCommentsOfPostAsync(int fieldId);
        Task<Comment?> GetCommentAsync(int id);
        bool CommentExists(int commentId);
        bool CreateComment(Comment comment);
        bool DeleteComment(Comment comment);
        bool Save();
    }
}
