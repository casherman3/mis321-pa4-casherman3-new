using Microsoft.AspNetCore.Cors;
using MySql.Data.MySqlClient;

string cs = @"server=<x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com>;user=<xihhvy2jshkl496v>;database=<n1m1t1603uii3ac3>;port=<3306>;password=<kgdwfwxvyb50kqrs>";
using var con = new MySqlConnection(cs);
con.Open();
string stm = "select MySql_VERISON()";
// using var cmd = new MySqlCommand(con);
cmd.CommandText = @"INSERT INTO exercises(activity_type, distance_in_miles, date_completed, pinned, deleted) VALUES(@activity_type, @distance_in_miles, @date_completed, @pinned, @deleted)";

con.Close();


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenPolicy",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("OpenPolicy");

app.MapControllers();

app.Run();
