using Commerce.Core.DTO;
using Commerce.Core.Interfaces;
using Commerce.Entity.Identity;
using Microsoft.AspNetCore.Identity;

namespace Commerce.Business.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthService(UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
{
    var user = await _userManager.FindByEmailAsync(dto.Email);
    if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
        return null;
    var roles = await _userManager.GetRolesAsync(user);
    return new AuthResponseDto
    {
        Token = _tokenService.GenerateToken(user.Id, user.Email!, user.FirstName, user.LastName, roles),
        UserName = $"{user.FirstName} {user.LastName}" 
    };
}

    public async Task<AuthResponseDto?> RegisterAsync(RegisterDto dto)
    {
        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded) return null;

        await _userManager.AddToRoleAsync(user, "Customer");
        var roles = await _userManager.GetRolesAsync(user);

        return new AuthResponseDto
        {
            Token = _tokenService.GenerateToken(user.Id, user.Email!, user.FirstName, user.LastName, roles)
        };
    }
}