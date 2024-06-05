using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class editroletoken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "600e3a0f-3d22-471f-a6cd-786df9100ce3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9030bd2b-8ea0-4061-ac20-f49b7e6e44df");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b9956cdb-ea8a-43ed-bd4d-ccee5cbdedb8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec8a40cb-b71e-43ae-8c1a-282b5bb6b8a3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36342210-5cc9-4c65-91a7-0ad4fd2208a2", null, "Admin", "ADMIN" },
                    { "4b1c8571-8d1b-467d-b895-add48bc484c1", null, "MainAdmin", "MAINADMIN" },
                    { "92621ece-24cb-4bfd-a02d-06baf68df3da", null, "User", "USER" },
                    { "c257a4a2-7428-4301-9546-e38c43d345c1", null, "FieldOwner", "FIELDOWNER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36342210-5cc9-4c65-91a7-0ad4fd2208a2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b1c8571-8d1b-467d-b895-add48bc484c1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "92621ece-24cb-4bfd-a02d-06baf68df3da");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c257a4a2-7428-4301-9546-e38c43d345c1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "600e3a0f-3d22-471f-a6cd-786df9100ce3", null, "MainAdmin", "MAINADMIN" },
                    { "9030bd2b-8ea0-4061-ac20-f49b7e6e44df", null, "FieldOwner", "FIELDOWNER" },
                    { "b9956cdb-ea8a-43ed-bd4d-ccee5cbdedb8", null, "Admin", "ADMIN" },
                    { "ec8a40cb-b71e-43ae-8c1a-282b5bb6b8a3", null, "User", "USER" }
                });
        }
    }
}
