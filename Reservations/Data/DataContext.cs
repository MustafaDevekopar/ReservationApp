using Microsoft.EntityFrameworkCore;
using Reservations.Models;

namespace Reservations.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<FootballField> FootballFields { get; set; }
        public DbSet<Governorate> Governorates { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationStatus> ReservationsStatus { get; set; }
        public DbSet<ReservationBlock> ReservationsBlock { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserField> UserFields { get; set; }
        public DbSet<View> Views { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserField>()
                .HasKey(pc => new { pc.UserId, pc.FieldId });
            modelBuilder.Entity<UserField>()
                .HasOne(p => p.User)
                .WithMany(pc => pc.UserFields)
                .HasForeignKey(p => p.UserId);
            modelBuilder.Entity<UserField>()
                .HasOne(p => p.FootballField)
                .WithMany(pc => pc.UserFields)
                .HasForeignKey(p => p.FieldId);


        }
    }
}
