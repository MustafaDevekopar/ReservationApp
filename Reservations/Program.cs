
//using Microsoft.EntityFrameworkCore;
//using Reservations.Data;
//using Reservations.Interfaces;
//using Reservations.Repository;

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
//            .AllowAnyHeader());
//});

//// Register your DbContext
//builder.Services.AddDbContext<DataContext>(options =>
//{
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//});

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//// Use CORS
//app.UseCors("AllowFrontend");

//app.UseAuthorization();

//app.MapControllers();

//app.Run();

using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Repository;
using Reservations.Hubs;  // Import the Hubs namespace

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

app.UseAuthorization();

app.MapControllers();

// Map SignalR hubs
app.MapHub<NotificationHub>("/notificationHub");

app.Run();
