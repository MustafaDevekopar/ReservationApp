using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class regsterTypeUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0fd79d13-f3b7-4b04-905b-1c300ef7610a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "58106356-3b13-4b4f-a7d5-0d8a82ca86be");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e893ba54-be65-4792-a2bf-36d6c9a033d0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f517e434-82e9-49a8-81d9-780c503c166d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "599298b2-53a0-4c6f-afb2-0791aa46ee2a", null, "MainAdmin", "MAINADMIN" },
                    { "944b44c4-5ed6-40d7-9523-636c582d69c1", null, "Admin", "ADMIN" },
                    { "ce61ab10-70eb-478d-8cc5-2421bf8aae66", null, "User", "USER" },
                    { "e6f916af-4d6c-476e-8314-598ff5b8b696", null, "FieldOwner", "FIELDOWNER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "599298b2-53a0-4c6f-afb2-0791aa46ee2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "944b44c4-5ed6-40d7-9523-636c582d69c1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ce61ab10-70eb-478d-8cc5-2421bf8aae66");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e6f916af-4d6c-476e-8314-598ff5b8b696");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0fd79d13-f3b7-4b04-905b-1c300ef7610a", null, "FieldOwner", "FIELDOWNER" },
                    { "58106356-3b13-4b4f-a7d5-0d8a82ca86be", null, "Admin", "ADMIN" },
                    { "e893ba54-be65-4792-a2bf-36d6c9a033d0", null, "MainAdmin", "MAINADMIN" },
                    { "f517e434-82e9-49a8-81d9-780c503c166d", null, "User", "USER" }
                });
        }
    }
}
