using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class AddBiographyUperCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "biography",
                table: "Users",
                newName: "Biography");

            migrationBuilder.RenameColumn(
                name: "biography",
                table: "FootballFields",
                newName: "Biography");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Biography",
                table: "Users",
                newName: "biography");

            migrationBuilder.RenameColumn(
                name: "Biography",
                table: "FootballFields",
                newName: "biography");
        }
    }
}
