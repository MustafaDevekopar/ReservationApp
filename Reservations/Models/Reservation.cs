﻿namespace Reservations.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public User User { get; set; }
        public FootballField FootballField { get; set; }
    }
}
