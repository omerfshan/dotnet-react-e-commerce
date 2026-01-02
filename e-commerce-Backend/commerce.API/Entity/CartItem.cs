namespace API.Entity;

public class CartItem
{
    public int CartItemId { get; set; }

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public int CartId { get; set; }
//     public Cart Cart { get; set; } = null!;
    public int Quantity{ get; set; }
}
