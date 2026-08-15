namespace Commerce.Core.DTO;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    public string? ImageUrl { get; set; }
    public int Stock { get; set; }
    public List<CategoryDto> Categories { get; set; } = new();
}