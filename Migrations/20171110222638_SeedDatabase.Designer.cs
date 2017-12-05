using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert Into Makes (Name) Values ('Make1')");
            migrationBuilder.Sql("Insert Into Makes (Name) Values ('Make2')");
            migrationBuilder.Sql("Insert Into Makes (Name) Values ('Make3')");
            
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelA',(Select ID from Makes Where Name = 'Make1'))");
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelB',(Select ID from Makes Where Name = 'Make1'))");
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelC',(Select ID from Makes Where Name = 'Make1'))");
            
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelA',(Select ID from Makes Where Name = 'Make2'))");
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelB',(Select ID from Makes Where Name = 'Make2'))");
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelC',(Select ID from Makes Where Name = 'Make2'))");
            
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelA',(Select ID from Makes Where Name = 'Make3'))");
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelB',(Select ID from Makes Where Name = 'Make3'))");
            migrationBuilder.Sql("Insert Into Models (Name,MakeID) Values ('Make1-ModelC',(Select ID from Makes Where Name = 'Make3'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete From Makes Where Name In ('Make1','Make2','Make3')");
            migrationBuilder.Sql("Delete From Models Where ModelID In ( Select ID from Makes Where Name In ('Make1','Make2','Make3') )");
        }
    }
}