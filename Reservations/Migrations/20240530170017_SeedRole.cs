using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class SeedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "50f24d2c-676b-45de-a76e-f6424b7dd0f5", null, "Admin", "ADMIN" },
                    { "5137b8b3-b7db-48ad-a5f4-c18dbfc72b07", null, "User", "USER" },
                    { "8435b2b0-64e7-4693-bf32-4c83b8e9b9a4", null, "FieldOwner", "FIELDOWNER" },
                    { "b6c14353-1abf-4325-a0ff-b896a003fe58", null, "MainAdmin", "MAINADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "50f24d2c-676b-45de-a76e-f6424b7dd0f5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5137b8b3-b7db-48ad-a5f4-c18dbfc72b07");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8435b2b0-64e7-4693-bf32-4c83b8e9b9a4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6c14353-1abf-4325-a0ff-b896a003fe58");
        }
    }
}
