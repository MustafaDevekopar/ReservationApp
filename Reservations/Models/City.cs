﻿namespace Reservations.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<FootballField> FootballFields { get; set;}
    }
}
