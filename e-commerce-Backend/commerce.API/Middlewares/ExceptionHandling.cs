using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

public class ExceptionHandling
{
     private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandling> _logger;
        private readonly IHostEnvironment _env;
    public ExceptionHandling(RequestDelegate next, ILogger<ExceptionHandling> logger, IHostEnvironment env)
    {
        _next=next;
        _logger=logger;
        _env=env;
        
    }
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex )
        {
            
           _logger.LogError(ex, ex.Message);
           context.Response.ContentType="application/json";
            context.Response.StatusCode=500;

            var Response =new ProblemDetails
            {
                Status=500,
                Detail=_env.IsDevelopment()?ex.StackTrace?.ToString():null,
                Title=ex.Message
            };
            var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
            var json=JsonSerializer.Serialize(Response,options);
            await context.Response.WriteAsync(json);
        }
    }
}