using Reservations.Dto.FieldDto;
using Reservations.Dto.Reservation;
using Reservations.Dto.Team;
using Reservations.Dto.User;
using Reservations.Models;

namespace Reservations.Dto.Notification
{
    public class NotificationReservationGetDto
    {
        public int Id { get; set; }


        public string? Text { get; set; }
        public bool? IsAccept { get; set; }
        public bool IsRead { get; set; }

        public UserMainInfoDto User { get; set; }

        public FootballGetDto FootballField { get; set; }

        public ReservationDto Reservation { get; set; }
        public TeamDto Team { get; set; }
        //====
        public ICollection<UserNotificationDto> UserNotifications { get; set; }
    }
}
