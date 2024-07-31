
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Repository;
using Reservations.Hubs;
using Reservations.Models;
using Reservations.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using Reservations.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Register your repositories and DbContext
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IGovernorateRepository, GovernorateRepository>();
builder.Services.AddScoped<IFootballFieldRepository, FootballFieldRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IViewRepository, ViewRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILikeRepository, LikeRepository>();
builder.Services.AddScoped<IUserFieldRepository, UserFieldRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<ITeamRepository, TeamRepository>();

builder.Services.AddSingleton<ShareDb>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

// Add CORS to allow requests from frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins( "https://main--eloquent-sable-14f4a9.netlify.app","http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());  // Allow credentials for SignalR
});

// Register your DbContext
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Configure the Identity
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    //options.Password.RequireNonAlphanumeric = true; // I make stoping to this line . it nead to make migration of update-database
    options.Password.RequiredLength = 5;
}).AddEntityFrameworkStores<DataContext>()
  .AddSignInManager()
  .AddRoles<IdentityRole>();

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]!))
    };
});

// Add SignalR services
builder.Services.AddSignalR();

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("MainAdminAdminFieldOwnerUser", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("MainAdmin", "Admin", "FieldOwner", "User");
    })
    .AddPolicy("MainAdminAdminFieldOwner", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("MainAdmin", "Admin", "FieldOwner");
    })
    .AddPolicy("MainAdminAdminUser", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("MainAdmin", "Admin", "User");
    })
    .AddPolicy("MainAdminAdmin", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("MainAdmin", "Admin");
    })
    .AddPolicy("MainAdmin", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("MainAdmin");
    })
    .AddPolicy("FieldOwnerUser", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("FieldOwner", "User");
    })
    .AddPolicy("FieldOwner", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("FieldOwner");
    })
    .AddPolicy("User", o =>
    {
        o.RequireAuthenticatedUser();
        o.RequireRole("User");
    });


var app = builder.Build();

//if (app.Environment.IsDevelopment()) // comet to make deploy
//{
app.UseSwagger();
app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowFrontend");
// test public Actions
app.UseAuthentication();
// auth ApiKey
app.UseMiddleware<ApiKeyMiddleware>();
app.UseAuthorization();

app.MapControllers();

// Map SignalR hubs
app.MapHub<NotificationHub>("/api/notificationHub");

app.Run();

