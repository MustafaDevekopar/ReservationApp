using System.Text.Json.Serialization;
using Reservations.Dto.User;

namespace Reservations.Dto.Comment
{
    public class CommentsWithUser
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public UserToCommentDto User { get; set; }

    }
}
