using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Reserva.Data.Models {

    public enum ContactType
    {
        ContactType1, ContactType2, ContactType3
    }

    public class Contact{
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public ContactType? ContactType { get; set;}
        
        [Required]
        public int Phone { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Birthdate { get; set; }
        public virtual ICollection<Reservation> Bookings { get; set; }

        public Contact() {
            Bookings = new HashSet<Reservation>();
        }
   }
}