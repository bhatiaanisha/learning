using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WoodenStreet;
using WoodenStreet.IServices;
using WoodenStreet.Models;
using WoodenStreet.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<WoodenStreetContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("DemoDb")));
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFurnitureService, FurnitureService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISubCategoryService, SubCategoryService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IProductOverviewService, ProductOverviewService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Read the key from AppSettings.cs
var appsettingsread = builder.Configuration.GetSection("AppSettings");

//add the key to services
builder.Services.Configure<AppSettings>(appsettingsread);

//JWT Authentication
var settings = appsettingsread.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(settings.Key);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(jwt =>
{
    jwt.RequireHttpsMetadata = false; 
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "http://localhost:3000"));

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
