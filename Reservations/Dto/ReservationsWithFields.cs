namespace Reservations.Dto
{
    public class ReservationsWithFields
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
        public FieldOfReservationDto Fields { get; set; }
    }
}
