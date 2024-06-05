using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class AppUserRelationShip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "FootballFieldId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_FootballFieldId",
                table: "AspNetUsers",
                column: "FootballFieldId",
                unique: true,
                filter: "[FootballFieldId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserId",
                table: "AspNetUsers",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_FootballFields_FootballFieldId",
                table: "AspNetUsers",
                column: "FootballFieldId",
                principalTable: "FootballFields",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Users_UserId",
                table: "AspNetUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_FootballFields_FootballFieldId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Users_UserId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_FootballFieldId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserId",
                table: "AspNetUsers");

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

            migrationBuilder.DropColumn(
                name: "FootballFieldId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AspNetUsers");

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
    }
}
