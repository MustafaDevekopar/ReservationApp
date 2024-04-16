﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public CommentController(ICommentRepository commentRepository,
            IPostRepository postRepository,
            IUserRepository userRepository,
            IMapper mapper)
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var comments = _mapper.Map<List<CommentDto>>(await _commentRepository.GetCommentsAsync());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comments);
        }


        [HttpGet("{commentId}")]
        public async Task<IActionResult> GetById(int commentId)
        {
            if (!_commentRepository.CommentExists(commentId))
                return NotFound(ModelState);

            var comment = _mapper.Map<CommentDto>(await _commentRepository.GetCommentAsync(commentId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comment);
        }

        [HttpGet("{commentId}/commentPost")]
        public async Task<IActionResult> GetCommentsOfPost(int commentId)
        {
            var comments = _mapper.Map<List<CommentDto>>
                (await _commentRepository.GetCommentsOfPostAsync(commentId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCommment([FromBody] CommentDto commentCreate,
            [FromQuery]int userId, 
            [FromQuery]int postId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var resMap = _mapper.Map<Comment>(commentCreate);

            resMap.Post = await _postRepository.GetPostAsync(postId);
            resMap.User = await _userRepository.GetUserAsync(userId);

            if (!_commentRepository.CreateComment(resMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }
    }
}