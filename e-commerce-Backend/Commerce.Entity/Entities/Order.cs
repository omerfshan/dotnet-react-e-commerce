namespace Commerce.Entity.Entities;

public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}

public class Order
{
    public int Id { get; set; } = 0;
    public string OrderNumber { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string AddressTitle { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string FullAddress { get; set; } = string.Empty;

    public decimal SubTotal { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal GrandTotal { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public List<OrderItem> OrderItems { get; set; } = new();
}
