using Microsoft.AspNetCore.Identity;

namespace Commerce.Entity.Identity;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Address Details
    public string? AddressTitle { get; set; }
    public string? FullAddress { get; set; }
    public string? City { get; set; }

    // JWT Refresh Token
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
}