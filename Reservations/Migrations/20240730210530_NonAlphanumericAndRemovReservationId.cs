using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservations.Migrations
{
    /// <inheritdoc />
    public partial class NonAlphanumericAndRemovReservationId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Reservations_ReservationId",
                table: "Notification");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Reservations_ReservationId",
                table: "Notification",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Reservations_ReservationId",
                table: "Notification");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Reservations_ReservationId",
                table: "Notification",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id");
        }
    }
}
