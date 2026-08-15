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
            UserName = $"{user.FirstName} {user.LastName}",
            FirstName = user.FirstName
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
            Token = _tokenService.GenerateToken(user.Id, user.Email!, user.FirstName, user.LastName, roles),
            UserName = $"{user.FirstName} {user.LastName}",
            FirstName = user.FirstName
        };
    }

    public async Task<UserProfileDto?> GetProfileAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return null;

        return new UserProfileDto
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email ?? string.Empty,
            PhoneNumber = user.PhoneNumber,
            AddressTitle = user.AddressTitle,
            FullAddress = user.FullAddress,
            City = user.City
        };
    }

    public async Task<bool> UpdateProfileAsync(string userId, UpdateProfileDto dto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return false;

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.PhoneNumber = dto.PhoneNumber;
        user.AddressTitle = dto.AddressTitle;
        user.FullAddress = dto.FullAddress;
        user.City = dto.City;

        var result = await _userManager.UpdateAsync(user);
        return result.Succeeded;
    }

    public async Task<bool> ChangePasswordAsync(string userId, ChangePasswordDto dto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return false;

        var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
        return result.Succeeded;
    }
}