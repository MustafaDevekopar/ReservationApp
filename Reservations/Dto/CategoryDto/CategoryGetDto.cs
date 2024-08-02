using Newtonsoft.Json.Converters;
using System.Text.Json.Serialization;

namespace Reservations.Dto.CategoryDto
{
    public class CategoryGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTime CreatedAt { get; set; }
    }
}
