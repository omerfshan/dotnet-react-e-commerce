using System.Text.Json;
using Commerce.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;

public class ExceptionHandling
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandling> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionHandling(RequestDelegate next, ILogger<ExceptionHandling> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);

            var statusCode = StatusCodes.Status500InternalServerError;

            if (ex is NotFoundException)
            {
                statusCode = StatusCodes.Status404NotFound;
            }
            else if (ex is BadRequestException || ex is ArgumentException)
            {
                statusCode = StatusCodes.Status400BadRequest;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            var response = new ProblemDetails
            {
                Status = statusCode,
                Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                Title = ex.Message
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }
    }
}