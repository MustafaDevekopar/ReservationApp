﻿using Reservations.Models;

namespace Reservations.Dto.Post
{
    public class PostDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public IFormFile Image { get; set; }

    }
}
