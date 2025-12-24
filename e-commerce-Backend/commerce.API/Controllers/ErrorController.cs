using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ErrorController:ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult NotFoundError()
    {
        return NotFound();
    }
    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest();
    }
     [HttpGet("unauthorized")]
    public IActionResult UnauthorizedError()
    {
        return Unauthorized();
    }
    [HttpGet("server-error")]
    public IActionResult ServerEror()
    {
        throw new Exception("server error");
    }
     [HttpGet("validation-error")]
    public IActionResult ValidationEror()
    {
       ModelState.AddModelError("validation error 2", "validation eror details");
       ModelState.AddModelError("validation error 1", "validation eror details");
       return ValidationProblem();
    }




}