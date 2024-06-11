using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto.Account;
using Reservations.Interfaces;
using Reservations.Models;


using System.Security.Claims;


namespace Reservations.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "MainAdmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountAdminController : ControllerBase
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

        public AccountAdminController(UserManager<AppUser> userManager,
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

                if (registerDto.AccountType == "Admin" || registerDto.AccountType == "MainAdmin")
                {
                    var newUser = new User
                    {
                        Username = registerDto.Username,
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

                    var appUser = new AppUser
                    {
                        UserName = registerDto.Username,
                        PhoneNumber = registerDto.PhoneNumber,
                        AccountType = registerDto.AccountType,
                        UserId = relatedId,
                        FootballFieldId = null
                    };

                    var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                    if (!createdUser.Succeeded)
                        return StatusCode(500, createdUser.Errors);

                    var userClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.MobilePhone, registerDto.PhoneNumber),
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
                else
                {
                    ModelState.AddModelError("", "نوع الحساب خارج عن النمط المقبول");
                    return BadRequest(ModelState);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}