using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Reserva.Data.Models {

    public class Contact{
        public int Id { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 3 )]
        public string Name { get; set; }

        [Required]
        public string ContactType { get; set;}
        
        [Required]
        public int Phone { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Birthdate { get; set; }
        public virtual ICollection<Reservation> Bookings { get; set; }

        public Contact() {
            Bookings = new HashSet<Reservation>();
        }
   }
}