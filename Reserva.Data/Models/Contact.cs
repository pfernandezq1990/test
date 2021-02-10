using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Reserva.Data.Models {

    public class Contact{
        public int Id { get; set; }

        public string Name { get; set; }

        public string ContactType { get; set;}
        
        public int Phone { get; set; }

        public DateTime Birthdate { get; set; }
        public virtual ICollection<Reservation> Bookings { get; set; }

        public Contact() {
            Bookings = new HashSet<Reservation>();
        }
   }
}