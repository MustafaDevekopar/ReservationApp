using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class FootballFieldAvatar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Avatar",
                table: "FootballFields",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "FootballFields");
        }
    }
}
