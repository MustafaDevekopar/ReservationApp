﻿namespace Reservations.Dto.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

    }
}
