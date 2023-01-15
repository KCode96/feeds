global using FeedComments.Helpers;
using FeedsComments.Data;
using FeedsComments.Interfaces;
using FeedsComments.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddDbContext<DataContext>();
builder.Services.AddTransient<Client>();
builder.Services.AddTransient<Claim>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:3000", "https://feeds-nine.vercel.app")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }
    );
});
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(
        options =>
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    System.Text.Encoding.UTF8.GetBytes(
                        builder.Configuration.GetSection("AppSettings:Token").Value!
                    )
                ),
                ValidateIssuer = false,
                ValidateAudience = false,
            }
    );
builder.Services.AddSwaggerGen(c =>
{
    c.OperationFilter<SecurityRequirementsOperationFilter>();
    c.AddSecurityDefinition(
        "oauth2",
        new OpenApiSecurityScheme
        {
            Description =
                "Standard Authorization header using the Bearer scheme. Example: \"bearer {token}\"",
            In = ParameterLocation.Header,
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey
        }
    );
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
