using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.Models;
using Microsoft.EntityFrameworkCore;
using StackOverflow.IServices;
using StackOverflow.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace StackOverflow
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<StackOverflowDemoContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DemoDb")));
            services.AddScoped<IUserservice, UserService>();
            //services.AddScoped<ITagService, TagService>();
            //services.AddScoped<IQuestionService, QuestionService>();
            //services.AddScoped<IAnswerService, AnswerService>();
            //services.AddScoped<IQuestionCommentService, QuestionCommentService>();
            //services.AddScoped<IQuestionVoteService, QuestionVoteService>();
            //services.AddScoped<IAnswerCommentService, AnswerCommentService>();
            services.AddControllers();

            //Read the key from AppSettings
            var appsettingsread = Configuration.GetSection("AppSettings");
            //add the key to services
            services.Configure<AppSettings>(appsettingsread);

            //JWT Authentication
            var settings = appsettingsread.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(settings.Key);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(jwt =>
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

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "http://stackoverflow-2396-anisha-portal.radixind.in"));

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
