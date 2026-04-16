using Commerce.Core.DTO;
using Commerce.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace commerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

   [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDto dto)
{
    var result = await _authService.LoginAsync(dto);

    if (result == null)
        return Unauthorized("Geçersiz giriş bilgileri.");

    return Ok(result);
}
}