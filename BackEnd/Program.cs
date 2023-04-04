using System.Text.Json.Serialization;
using BackEnd.Data;
using BackEnd.Models;
using Microsoft.AspNetCore.HttpLogging;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddHttpLogging(logging =>
// {
//     // Customize HTTP logging here.
//     logging.LoggingFields = HttpLoggingFields.All;
//     logging.RequestHeaders.Add("sec-ch-ua");
//     logging.ResponseHeaders.Add("my-response-header");
//     logging.MediaTypeOptions.AddText("application/javascript");
//     logging.RequestBodyLogLimit = 4096;
//     logging.ResponseBodyLogLimit = 4096;
// });

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//                       policy =>
//                       {
//                           policy.WithOrigins("http://localhost:19000", "https://localhost:19000").AllowAnyHeader().AllowAnyMethod();
//                       });
// });
/* Ignore circular references when serializing objects into JSON*/
builder.Services.AddControllersWithViews().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Attach an EF Core database context to each query
builder.Services.AddDbContext<BackEndContext>();

var app = builder.Build();

app.UseHttpLogging();

// Seed data into DB
SeedData.init();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpLogging();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
