

using Commerce.Core.DTO;

namespace Commerce.Core.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<AuthResponseDto?> RegisterAsync(RegisterDto dto);
    Task<UserProfileDto?> GetProfileAsync(string userId);
    Task<bool> UpdateProfileAsync(string userId, UpdateProfileDto dto);
    Task<bool> ChangePasswordAsync(string userId, ChangePasswordDto dto);
}

