namespace Commerce.Core.DTO;

public class CreateOrderDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string AddressTitle { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string FullAddress { get; set; } = string.Empty;
    public string ShippingOption { get; set; } = "standard"; // standard or express
}

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string ProductImageUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

public class OrderDto
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; }

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string AddressTitle { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string FullAddress { get; set; } = string.Empty;

    public decimal SubTotal { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal GrandTotal { get; set; }
    public string Status { get; set; } = string.Empty;

    public List<OrderItemDto> OrderItems { get; set; } = new();
}
