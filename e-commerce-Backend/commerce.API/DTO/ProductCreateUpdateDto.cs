namespace API.Dto
{
    public class ProductCreateUpdateDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public string? ImageUrl { get; set; }
        public int Stock { get; set; }

        // ✅ çoklu kategori
        public List<int> CategoryIds { get; set; } = new();
    }
}
