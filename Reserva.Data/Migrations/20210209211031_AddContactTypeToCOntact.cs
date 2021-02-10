using Microsoft.EntityFrameworkCore.Migrations;

namespace Reserva.Data.Migrations
{
    public partial class AddContactTypeToCOntact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactType",
                table: "Contacts",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactType",
                table: "Contacts");
        }
    }
}
