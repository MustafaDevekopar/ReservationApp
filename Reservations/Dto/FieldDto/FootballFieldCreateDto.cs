﻿namespace Reservations.Dto.FieldDto
{
    public class FootballFieldCreateDto
    {
        public int categoryId { get; set; }
        public int governorateId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        //public string Password { get; set; }
        //public decimal PhoneNumbr { get; set; }
        public string Location { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
