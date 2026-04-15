using Microsoft.AspNetCore.Identity;

namespace Commerce.Entity.Identity;

public class ApplicationRole : IdentityRole
{
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}