namespace API.Entity
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public decimal Price { get; set; }
        public bool IsActive { get; set; }

        public string? ImageUrl { get; set; }
        public int Stock { get; set; }

        // ❌ CategoryId YOK
        // ❌ Category YOK

        // ✅ Çoklu kategori
        public ICollection<ProductCategory> ProductCategories { get; set; }
            = new List<ProductCategory>();
    }
}
