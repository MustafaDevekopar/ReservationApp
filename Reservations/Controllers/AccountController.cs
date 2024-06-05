using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly DataContext _context; // تعيين السياق للوصول إلى البيانات
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
                      IConfiguration config) // تمرير السياق كوحدة تحكم

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
                AppUser User = await _userManager.FindByEmailAsync(registerDto.Email);
                if (User != null) return BadRequest(ModelState);

                // متغير لتخزين معرف السجل الجديد
                int? relatedId = null;

                if (registerDto.AccountType == "User")
                {
                    var user = new User
                    {
                        Username = registerDto.Username,
                        PhoneNumbr = 7830574093,
                    };

                    if (!_userRepository.CreateUser(user))
                    {
                        ModelState.AddModelError("", "حدث خطا اثناء حفظ البيانات يرجى التواصل مع الدعم الفني");
                        return BadRequest(ModelState);
                    }

                    // Id of new user
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
                        PhoneNumbr = 7830574093
                    };
                    footballField.Category = await _categoryRepository.GetCategoryAsync(1);
                    footballField.Governorate = await _governorateRepository.GetGovernorateAsync(1);
                    footballField.ReservationBlock = await _reservationBlockRepository.GetReservationBlockAsync(1);
                    footballField.ReservationStatus = await _reservationStatusRepository.GetReservationStatusByIdAsync(1);

                    if (!_footballFieldRepository.CreateFootballField(footballField))
                    {
                        ModelState.AddModelError("", "حدث خطا اثناء حفظ البيانات يرجى التواصل مع الدعم الفني");
                        return BadRequest(ModelState);
                    }

                    // Id of new user
                    if (!_footballFieldRepository.FieldExixtsUsername(registerDto.Username))
                        return NotFound(ModelState);


                    // تخزين معرف مالك الحقل الجديد
                    var fieldId = await _footballFieldRepository.GetFieldIdByUsername(registerDto.Username);
                    relatedId = fieldId;
                }

                // إنشاء مستخدم AppUser وتعيين معرف السجل الجديد
                AppUser appUser = new()
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.Password,
                    AccountType = registerDto.AccountType,
                    UserId = registerDto.AccountType == "User" ? relatedId : null,
                    FootballFieldId = registerDto.AccountType == "FieldOwner" ? relatedId : null
                };

                // الآن إنشاء المستخدم في Identity
                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!createdUser.Succeeded)
                    return StatusCode(500, createdUser.Errors);

                Claim[] userClaims = [
                    new Claim(ClaimTypes.Email, registerDto.Email),
                    new Claim(ClaimTypes.Role, registerDto.AccountType)
                ];

                await _userManager.AddClaimsAsync(appUser!, userClaims);

                return Ok(new NewUserDto
                {
                    UserName = appUser.UserName,
                    Email = appUser.Email,
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

                var user = await _userManager.FindByNameAsync(loginDto.Username);

                if (user == null)
                    return NotFound("اسم المستخدم غير موجود");

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded) 
                    return Unauthorized("كلمة المرور غير صحيحة");

                return Ok(new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = await _tokenService.CreateTokenAsync(user),
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
