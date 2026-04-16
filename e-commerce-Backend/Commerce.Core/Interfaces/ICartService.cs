using Commerce.Core.DTO;

namespace Commerce.Core.Interfaces;

public interface ICartService
{
    Task<(CartDto cart, string? newCustomerId)> GetCartAsync(string? customerId);
    Task<(CartDto? cart, string? newCustomerId)> AddItemToCartAsync(string? customerId, int productId, int quantity);
    Task<(CartDto? cart, string? newCustomerId)> RemoveItemFromCartAsync(string? customerId, int productId, int quantity);
}
