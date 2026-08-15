using Commerce.Entity.Identity;

namespace Commerce.Entity;

public class UserFavorite
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser? User { get; set; }

    public int ProductId { get; set; }
    public Product? Product { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
