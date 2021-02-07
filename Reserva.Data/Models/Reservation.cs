using System;
using System.Text.Json.Serialization;

namespace Reserva.Data.Models{
    public class Reservation {
        public int Id { get; set;}        
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public int Ranking { get; set; }
        public bool Favorite { get; set; }

        public int ContactId { get; set; }

        [JsonIgnore]
        public virtual Contact Contact { get; set; }

       
    }
}