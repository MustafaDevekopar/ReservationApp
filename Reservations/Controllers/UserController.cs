using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Dto.User;
using Reservations.Interfaces;
using Reservations.Models;


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
            var users = await _userRepository.GetUsersAsync();

            var usersMap = users.Select(user =>
            {
                string avatarBase64 = user.Avatar != null ? Convert.ToBase64String(user.Avatar) : null;
                return new UserGetDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Username = user.Username,
                    //Password = user.Password,
                    //PhoneNumbr = user.PhoneNumbr,
                    CreatedAt = user.CreatedAt,
                    Avatar = avatarBase64
                };
            }).ToList();

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(usersMap);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound(ModelState);
            var user = await _userRepository.GetUserAsync(userId);

            string avatarBase64 = user.Avatar != null ? Convert.ToBase64String(user.Avatar) : null;

            var userMap = new UserGetDto
            {
                Id = userId,
                Name = user.Name,
                Username = user.Username,
                CreatedAt = user.CreatedAt,
                Avatar = avatarBase64 
            };

            //var user =_mapper.Map<UserDto>(await _userRepository.GetUserAsync(userId));GetUserByUsernameAsync

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(userMap);
        }

        [HttpGet("UserIdByUsername/{username}")]
        public async Task<IActionResult> GetUserIdByUsername(string username)
        {
            if (!_userRepository.UserExistsbyUsername(username))
                return NotFound(ModelState);
            var userId = await _userRepository.GetUserIdByUsername(username);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(userId);
        }

        [HttpGet("username/{username}")]
        public async Task<IActionResult> GetUserByUserName(string username)
        {
            if (!_userRepository.UserExistsbyUsername(username))
                return NotFound(ModelState);
            var user = await _userRepository.GetUserByUsernameAsync(username);

            string avatarBase64 = user.Avatar != null ? Convert.ToBase64String(user.Avatar) : null;

            var userMap = new UserGetDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                //Password = user.Password,
                //PhoneNumbr = user.PhoneNumbr,
                CreatedAt = user.CreatedAt,
                Avatar = avatarBase64
            };
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(userMap);
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
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromForm]UserDto CreateUser)
        {
            using var strem = new MemoryStream();
            await CreateUser.Avatar.CopyToAsync(strem);

            var userMap = new User
            {
                Name = CreateUser.Name,
                CreatedAt = CreateUser.CreatedAt,
                Avatar = strem.ToArray()
            };

            if (!_userRepository.CreateUser(userMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");

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

        //===========update ==========================
        [HttpPatch("{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, 
            [FromBody] JsonPatchDocument<UserPatchDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var user = await _userRepository.GetUserAsync(userId);
            if (user == null)
            {
                ModelState.AddModelError("", "غير موجود");
                return NotFound(ModelState);
            }

            var userToPatch = _mapper.Map<UserPatchDto>(user);
            patchDoc.ApplyTo(userToPatch, ModelState);

            if (!TryValidateModel(userToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(userToPatch, user);

            if (!_userRepository.UpdateUser(user))
            {
                ModelState.AddModelError("", "Something went wrong while updating");
                return BadRequest(ModelState);
            }

            return Ok("تم التعديل ");
        }
        // ============== update avatar ==============
        [HttpPut("{userId}/avatar")]
        public async Task<IActionResult> UpdateAvatar(int userId, [FromForm] UserAvatarUpdateDto avatarUpdateDto)
        {
            if (avatarUpdateDto?.Avatar == null)
            {
                ModelState.AddModelError("", "Avatar file is required");
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetUserAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            using var memoryStream = new MemoryStream();
            await avatarUpdateDto.Avatar.CopyToAsync(memoryStream);
            user.Avatar = memoryStream.ToArray();

            if (!_userRepository.UpdateUser(user))
            {
                ModelState.AddModelError("", "Something went wrong while updating the avatar");
                return BadRequest(ModelState);
            }

            return Ok("Avatar updated successfully");
        }




    }
}

