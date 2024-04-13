using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        public CommentController(ICommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
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
    }
}
