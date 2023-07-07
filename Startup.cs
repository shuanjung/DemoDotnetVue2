using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using DemoDotnetVue2.Models.QueryResult;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoDotnetVue2
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
            _ = services.AddControllersWithViews();
            _ = services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(8);
            });
            _ = services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DemoDonetVue2", Version = "v1" });
            });
            _ = services.AddHttpClient<PolateService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                _ = app.UseDeveloperExceptionPage();
                _ = app.UseSwagger();
                _ = app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DemoDonetVue2 v1"));
            }

            _ = app.Use(async (context, next) =>
            {
                await next();
                // �P�_�O�_�n�s�������A�Ӥ��O�o�e API�ݨD
                bool IsAPI = !context.Request.Path.Value.StartsWith("/api");
                if (context.Response.StatusCode == 404 &&                        // �Ӹ귽���s�b
                    !System.IO.Path.HasExtension(context.Request.Path.Value) &&  //���}�̫�S���a���ɦW
                    !IsAPI) 
                {
                    context.Request.Path = "/index.html";
                    context.Response.StatusCode = 200;
                    await next();
                }
            });

            _ = app.UseHttpsRedirection();
            // Web API�]�w�w�]�ɮ�
            _ = app.UseDefaultFiles();
            _ = app.UseStaticFiles();

            _ = app.UseRouting();

            _ = app.UseAuthorization();

            _ = app.UseSession();

            _ = app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
