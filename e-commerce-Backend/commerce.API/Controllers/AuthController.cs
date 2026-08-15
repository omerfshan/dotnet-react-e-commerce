using System.Security.Claims;
using Commerce.Core.DTO;
using Commerce.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);

        if (result == null)
            return BadRequest("Kayıt işlemi başarısız.");

        return Ok(result);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok(new { message = "Çıkış başarılı." });
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var profile = await _authService.GetProfileAsync(userId);
        if (profile == null) return NotFound("Profil bulunamadı.");

        return Ok(profile);
    }

    [Authorize]
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var success = await _authService.UpdateProfileAsync(userId, dto);
        if (!success) return BadRequest("Profil güncelleme başarısız.");

        return Ok(new { message = "Profil başarıyla güncellendi." });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var success = await _authService.ChangePasswordAsync(userId, dto);
        if (!success) return BadRequest("Şifre değiştirme başarısız. Mevcut şifrenizi ve yeni şifre kurallarını kontrol ediniz.");

        return Ok(new { message = "Şifreniz başarıyla değiştirildi." });
    }
}