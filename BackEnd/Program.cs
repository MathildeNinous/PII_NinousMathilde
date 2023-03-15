using System.Text.Json.Serialization;
using BackEnd.Data;
using BackEnd.Models;

var builder = WebApplication.CreateBuilder(args);

/* Ignore circular references when serializing objects into JSON*/
builder.Services.AddControllersWithViews().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Attach an EF Core database context to each query
builder.Services.AddDbContext<BackEndContext>();

var app = builder.Build();

// Seed data into DB
SeedData.init();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
