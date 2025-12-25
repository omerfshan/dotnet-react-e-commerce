using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult NotFoundError() => NotFound();

    [HttpGet("bad-request")]
    public IActionResult BadRequestError() => BadRequest();

    [HttpGet("unauthorized")]
    public IActionResult UnauthorizedError() => Unauthorized();

    [HttpGet("server-error")]
    public IActionResult ServerEror() => throw new Exception("server error");

    [HttpGet("validation-error")]
    public IActionResult ValidationEror()
    {
        var errors = new Dictionary<string, string[]>
        {
            ["validation error 1"] = new[] { "validation error details" },
            ["validation error 2"] = new[] { "validation error details" }
        };

        return UnprocessableEntity(new ValidationProblemDetails(errors)
        {
            Title = "Validation failed",
            Status = StatusCodes.Status422UnprocessableEntity
        });
    }
}
