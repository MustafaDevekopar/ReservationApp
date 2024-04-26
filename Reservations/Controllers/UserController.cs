using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly IUserFieldRepository _userFieldRepository;
        private readonly IMapper _mapper;
        public UserController(IUserRepository userRepository,
            IFootballFieldRepository footballFieldRepository,
            IUserFieldRepository userFieldRepository,
            IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _footballFieldRepository = footballFieldRepository;
            _userFieldRepository = userFieldRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(await _userRepository.GetUsersAsync());

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound(ModelState);
            
            var user =_mapper.Map<UserDto>(await _userRepository.GetUserAsync(userId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }
        [HttpGet("{userId}/fields")]
        public async Task<IActionResult> GetUserOfField(int userId)
        {
            var fieldsOfuser = _mapper.Map<List<FootballFieldDto>>
                (_userRepository.GetFieldsOfUser(userId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(fieldsOfuser);
        }

        [HttpPost("userFollwedField")]
        public async Task<IActionResult> CreateUserFollowedField([FromBody]UserFieldDto UserFieldCreate)
        {
            if (UserFieldCreate == null)
                return BadRequest(ModelState);

            var user = await _userRepository.GetUserAsync(UserFieldCreate.UserId);
            var field = await _footballFieldRepository.GetFootballFieldAsync(UserFieldCreate.FieldId);

            if (user == null || field == null)
            {
                ModelState.AddModelError("", "User or field not found");
                return StatusCode(422, ModelState);
            }

            if (await _userFieldRepository.GetUserFieldAsync(UserFieldCreate.UserId, UserFieldCreate.FieldId) != null)
            {
                ModelState.AddModelError("", "User alredy follow this field");
                return StatusCode(422, ModelState);
            }

            var userFieldMap = _mapper.Map<UserField>(UserFieldCreate);
            if (!_userRepository.CreateUserFollowedField(userFieldMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }
    }
}
