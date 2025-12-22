namespace API.Dto
{
    public class ProductPatchDto
    {
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public bool? IsActive { get; set; }
        public int? Stock { get; set; }

        // ✅ kategori güncellemek istersen
        public List<int>? CategoryIds { get; set; }
    }
}
