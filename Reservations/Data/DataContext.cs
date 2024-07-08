
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Reservations.Models;

namespace Reservations.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<FootballField> FootballFields { get; set; }
        public DbSet<Governorate> Governorates { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserField> UserFields { get; set; }
        public DbSet<View> Views { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<UserTeam> UsersTeams { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);  // Ensure the base configuration is called first

            // many to many UserField Fluent API
            modelBuilder.Entity<UserField>()
                .HasKey(pc => new { pc.UserId, pc.FieldId });

            modelBuilder.Entity<UserField>()
                .HasOne(p => p.User)
                .WithMany(pc => pc.UserFields)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserField>()
                .HasOne(p => p.FootballField)
                .WithMany(pc => pc.UserFields)
                .HasForeignKey(p => p.FieldId)
                .OnDelete(DeleteBehavior.Restrict);


            //many to many UserTeam Fluent API
            modelBuilder.Entity<UserTeam>()
                .HasKey(pc => new { pc.UserId, pc.TeamId });

            modelBuilder.Entity<UserTeam>()
                .HasOne(p => p.User)
                .WithMany(pc => pc.UserTeams)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserTeam>()
                .HasOne(p => p.Team)
                .WithMany(pc => pc.UserTeams)
                .HasForeignKey(p => p.TeamId)
                .OnDelete(DeleteBehavior.Restrict);


            //many to many UserNotification
            modelBuilder.Entity<UserNotification>()
                .HasKey(pc => new { pc.UserId, pc.NotificationId });

            modelBuilder.Entity<UserNotification>()
                .HasOne(p => p.User)
                .WithMany(pc => pc.UserNotifications)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<UserNotification>()
                .HasOne(p => p.Notification)
                .WithMany(pc => pc.UserNotifications)
                .HasForeignKey(p => p.NotificationId);
        }
    }
}
