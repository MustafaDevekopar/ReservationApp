
//using Microsoft.EntityFrameworkCore;
//using Reservations.Data;
//using Reservations.Interfaces;
//using Reservations.Repository;
//using Reservations.Hubs;
//using Reservations.Models;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;  // Import the Hubs namespace

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllers();
//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//// Register your repositories and DbContext
//builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
//builder.Services.AddScoped<IGovernorateRepository, GovernorateRepository>();
//builder.Services.AddScoped<IFootballFieldRepository, FootballFieldRepository>();
//builder.Services.AddScoped<IReservationStatusRepository, ReservationStatusRepository>();
//builder.Services.AddScoped<IReservationBlockRepository, ReservationBlockRepository>();
//builder.Services.AddScoped<IPostRepository, PostRepository>();
//builder.Services.AddScoped<ICommentRepository, CommentRepository>();
//builder.Services.AddScoped<IViewRepository, ViewRepository>();
//builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<ILikeRepository, LikeRepository>();
//builder.Services.AddScoped<IUserFieldRepository, UserFieldRepository>();
//builder.Services.AddScoped<ITokenService, ITokenService>();

//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Add CORS to allow requests from frontend
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowFrontend",
//        builder => builder
//            .WithOrigins("http://localhost:3000") // Replace with your frontend URL
//            .AllowAnyMethod()
//            .AllowAnyHeader()
//            .AllowCredentials());  // Allow credentials for SignalR
//});

//// Register your DbContext
//builder.Services.AddDbContext<DataContext>(options =>
//{
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//});

//// configur the Identety
//builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
//{
//    options.Password.RequireDigit = true;
//    options.Password.RequireLowercase = true;
//    options.Password.RequireUppercase = true;
//    options.Password.RequireNonAlphanumeric = true;
//    options.Password.RequiredLength = 8;
//}).AddEntityFrameworkStores<DataContext>();

//builder.Services.AddAuthentication(options => {
//    options.DefaultAuthenticateScheme = 
//    options.DefaultChallengeScheme = 
//    options.DefaultForbidScheme = 
//    options.DefaultScheme = 
//    options.DefaultSignInScheme = 
//    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;

//}).AddJwtBearer(options => {
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidIssuer = builder.Configuration["JWT:Issuer"],
//        ValidateAudience = true,
//        ValidAudience = builder.Configuration["JWT:Audience"],
//        ValidateIssuerSigningKey = true,
//        IssuerSigningKey = new SymmetricSecurityKey(
//           System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
//        )
//    };
//});
//// Add SignalR services
//builder.Services.AddSignalR();

//var app = builder.Build();// error hear fix it System.ArgumentException: 'Cannot instantiate implementation type 'Reservations.Interfaces.ITokenService' for service type 'Reservations.Interfaces.ITokenService'.'

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//// Use CORS
//app.UseCors("AllowFrontend");

//app.UseAuthentication();
//app.UseAuthorization();


//app.MapControllers();

//// Map SignalR hubs
//app.MapHub<NotificationHub>("/notificationHub");

//app.Run();

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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Register your repositories and DbContext
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IGovernorateRepository, GovernorateRepository>();
builder.Services.AddScoped<IFootballFieldRepository, FootballFieldRepository>();
builder.Services.AddScoped<IReservationStatusRepository, ReservationStatusRepository>();
builder.Services.AddScoped<IReservationBlockRepository, ReservationBlockRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IViewRepository, ViewRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILikeRepository, LikeRepository>();
builder.Services.AddScoped<IUserFieldRepository, UserFieldRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();  // Correct registration

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS to allow requests from frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:3000") // Replace with your frontend URL
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
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
}).AddEntityFrameworkStores<DataContext>();

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
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
           System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        )
    };
});
// Add SignalR services
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Map SignalR hubs
app.MapHub<NotificationHub>("/notificationHub");

app.Run();

