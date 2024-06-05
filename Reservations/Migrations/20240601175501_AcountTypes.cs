using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class AcountTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "AccountType",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6943fdd3-d348-4a9f-9c92-b124c3b1f84a", null, "FieldOwner", "FIELDOWNER" },
                    { "6d6e0c5b-5223-45f8-a89c-fb4d45b3a00e", null, "Admin", "ADMIN" },
                    { "be799c4e-bf23-4472-8c2b-5ef24a873a57", null, "User", "USER" },
                    { "e8dce7e8-cfad-48af-aa63-07b352ba7958", null, "MainAdmin", "MAINADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6943fdd3-d348-4a9f-9c92-b124c3b1f84a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6d6e0c5b-5223-45f8-a89c-fb4d45b3a00e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be799c4e-bf23-4472-8c2b-5ef24a873a57");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e8dce7e8-cfad-48af-aa63-07b352ba7958");

            migrationBuilder.DropColumn(
                name: "AccountType",
                table: "AspNetUsers");

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
    }
}
