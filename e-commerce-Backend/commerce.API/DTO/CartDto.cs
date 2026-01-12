using API.Entity;
namespace API.Dto;
public class CartDto
{
    public int CartId { get; set; }
    public string CustomerId { get; set; } = null!;

    public List<CartItemDto> CartItems { get; set; } = new();
}