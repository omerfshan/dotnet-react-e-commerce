
namespace API.Dto;

public class ProductPatchDto
{
    public string? Name { get; set; }
    public decimal? Price { get; set; }
    public bool? IsActive { get; set; }
    public int? Stock { get; set; }
}
