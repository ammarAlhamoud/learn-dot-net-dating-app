using API;
using API.Extensions;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseHttpsRedirection();
app.UseAuthentication(); //order is important -> must be before UseAuthorization and before MapControllers
app.UseAuthorization();
app.MapControllers();

app.Run();
