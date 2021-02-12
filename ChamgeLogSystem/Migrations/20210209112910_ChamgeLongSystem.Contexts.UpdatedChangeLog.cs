using Microsoft.EntityFrameworkCore.Migrations;

namespace ChamgeLogSystem.Migrations
{
    public partial class ChamgeLongSystemContextsUpdatedChangeLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChangeLogs_Users_CreatedByUserId",
                table: "ChangeLogs");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedByUserId",
                table: "ChangeLogs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ChangeLogs_Users_CreatedByUserId",
                table: "ChangeLogs",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChangeLogs_Users_CreatedByUserId",
                table: "ChangeLogs");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedByUserId",
                table: "ChangeLogs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ChangeLogs_Users_CreatedByUserId",
                table: "ChangeLogs",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
