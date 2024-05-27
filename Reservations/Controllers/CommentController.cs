using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Reservations.Dto;
using Reservations.Hubs;
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
        private readonly IHubContext<NotificationHub> _hubContext;
        public CommentController(ICommentRepository commentRepository,
            IPostRepository postRepository,
            IUserRepository userRepository,
            IMapper mapper,
            IHubContext<NotificationHub> hubContext
            )
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _hubContext = hubContext;
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

        [HttpGet("{postId}/commentPost")]
        public async Task<IActionResult> GetCommentsOfPost(int postId)
        {

            var comments = await _commentRepository.GetCommentsOfPostAsync(postId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCommment([FromBody] CommentGreateDto commentCreate,
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
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", "اضافة تعليق ؟اشعار من السيرفر");

            return Ok("Successfully Created");
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            if (!_commentRepository.CommentExists(commentId))
                return NotFound();

            var commentToDelete = await _commentRepository.GetCommentAsync(commentId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_commentRepository.DeleteComment(commentToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();

        }
    }
}

