﻿using System.Text.Json.Serialization;

namespace Reservations.Dto
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
