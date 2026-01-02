namespace API.Entity;

public class Cart
{
    public int CartId { get; set; }
    public string CustomerId { get; set; } = null!;

    public List<CartItem> CartItems { get; set; } = new();

    // ➕ Ürün ekle
    public void AddItem(int productId, int quantity = 1)
    {
        if (quantity <= 0)
            return;

        var item = CartItems.FirstOrDefault(x => x.ProductId == productId);

        if (item is null)
        {
            CartItems.Add(new CartItem
            {
                ProductId = productId,
                Quantity = quantity
            });
        }
        else
        {
            item.Quantity += quantity;
        }
    }

    // ➖ Ürün sil
    public void RemoveItem(int productId, int quantity = 1)
    {
        var item = CartItems.FirstOrDefault(x => x.ProductId == productId);
        if (item is null)
            return;

        item.Quantity -= quantity;

        if (item.Quantity <= 0)
        {
            CartItems.Remove(item);
        }
    }
}
