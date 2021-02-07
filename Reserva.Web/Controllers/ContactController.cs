using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using Reserva.Data;
using Reserva.Data.Models;

namespace Reserva.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ContactController : ControllerBase{
        private readonly ReservationDbContext _context;

        public ContactController(ReservationDbContext context) {
            _context = context;
        }
        private bool ContactExist(int id)
        {
            return _context.Contacts.Any(c => c.Id == id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> Get() {
            return await _context.Contacts.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> Post([FromForm] Contact contact) {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(Get), new {id = contact.Id}, contact);
        }
    }
}