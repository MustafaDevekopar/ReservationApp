using Reservations.Dto.FieldDto;
using Reservations.Models;

namespace Reservations.Dto.Reservation
{
    public class ReservationFieldUserGetDto
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public UserInReservation userGet { get; set; }
        public FieldInReservation fieldGet { get; set; }
    }
}
