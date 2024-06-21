using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto.Account;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

using System.Security.Claims;


namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;//AccountAdminController
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IGovernorateRepository _governorateRepository;
        private readonly IReservationBlockRepository _reservationBlockRepository;
        private readonly IReservationStatusRepository _reservationStatusRepository;
        private readonly IConfiguration _config;

        public AccountController(UserManager<AppUser> userManager,
                      ITokenService tokenService,
                      SignInManager<AppUser> signInManager,
                      DataContext context,
                      IUserRepository userRepository,
                      IFootballFieldRepository footballFieldRepository,
                      ICategoryRepository categoryRepository,
                      IGovernorateRepository governorateRepository,
                      IReservationBlockRepository reservationBlockRepository,
                      IReservationStatusRepository reservationStatusRepository,
                      IConfiguration config)

        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _context = context;
            _userRepository = userRepository;
            _footballFieldRepository = footballFieldRepository;
            _categoryRepository = categoryRepository;
            _governorateRepository = governorateRepository;
            _reservationBlockRepository = reservationBlockRepository;
            _reservationStatusRepository = reservationStatusRepository;
            _config = config;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _userManager.Users.SingleOrDefaultAsync(x => x.PhoneNumber == registerDto.PhoneNumber);
                if (user != null)
                {
                    ModelState.AddModelError("", "رقم الهاتف مسجل بالفعل");
                    return BadRequest(ModelState);
                }

                int? relatedId = null;

                if (registerDto.AccountType == "User")
                {
                    var newUser = new User
                    {
                        Username = registerDto.Username,
                        //PhoneNumbr = decimal.Parse(registerDto.PhoneNumber),
                    };

                    if (!_userRepository.CreateUser(newUser))
                    {
                        ModelState.AddModelError("", "حدث خطأ أثناء حفظ البيانات، يرجى التواصل مع الدعم الفني");
                        return BadRequest(ModelState);
                    }

                    if (!_userRepository.UserExistsbyUsername(registerDto.Username))
                        return NotFound(ModelState);

                    var userId = await _userRepository.GetUserIdByUsername(registerDto.Username);
                    relatedId = userId;
                }
                else if (registerDto.AccountType == "FieldOwner")
                {
                    var footballField = new FootballField
                    {
                        Username = registerDto.Username,
                    };

                    footballField.Category = await _categoryRepository.GetCategoryAsync(1);
                    footballField.Governorate = await _governorateRepository.GetGovernorateAsync(1);
                    footballField.ReservationBlock = await _reservationBlockRepository.GetReservationBlockAsync(1);
                    footballField.ReservationStatus = await _reservationStatusRepository.GetReservationStatusByIdAsync(1);

                    if (!_footballFieldRepository.CreateFootballField(footballField))
                    {
                        ModelState.AddModelError("", "حدث خطأ أثناء حفظ البيانات، يرجى التواصل مع الدعم الفني");
                        return BadRequest(ModelState);
                    }

                    if (!_footballFieldRepository.FieldExixtsUsername(registerDto.Username))
                        return NotFound(ModelState);

                    var fieldId = await _footballFieldRepository.GetFieldIdByUsername(registerDto.Username);
                    relatedId = fieldId;
                }

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    PhoneNumber = registerDto.PhoneNumber,
                    AccountType = registerDto.AccountType,
                    UserId = registerDto.AccountType == "User" ? relatedId : null,
                    FootballFieldId = registerDto.AccountType == "FieldOwner" ? relatedId : null
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!createdUser.Succeeded)
                    return StatusCode(500, createdUser.Errors);

                var userClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.MobilePhone, registerDto.PhoneNumber),
                    //new Claim(ClaimTypes.Name, registerDto.Username),
                    new Claim(ClaimTypes.Role, registerDto.AccountType)
                };

                await _userManager.AddClaimsAsync(appUser, userClaims);

                return Ok(new NewUserDto
                {
                    UserName = appUser.UserName,
                    PhoneNumber = appUser.PhoneNumber,
                    Token = await _tokenService.CreateTokenAsync(appUser)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var user = await _userManager.Users.SingleOrDefaultAsync(x => x.PhoneNumber == loginDto.PhoneNumber);

                if (user == null)
                    return NotFound("رقم الهاتف غير موجود");

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded)
                    return Unauthorized("كلمة المرور غير صحيحة");

                return Ok(new NewUserDto
                {
                    UserName = user.UserName,
                    PhoneNumber = user.PhoneNumber,
                    Token = await _tokenService.CreateTokenAsync(user),
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("delete/{phoneNumber}")]
        public async Task<IActionResult> DeleteUser(string phoneNumber)
        {
            try
            {
                var user = await _userManager.Users.SingleOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var result = await _userManager.DeleteAsync(user);

                if (!result.Succeeded)
                {
                    return StatusCode(500, "Failed to delete user");
                }

                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}