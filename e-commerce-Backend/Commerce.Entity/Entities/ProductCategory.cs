using Commerce.Core.Interfaces;

namespace Commerce.Entity
{
    public class ProductCategory : IEntity
    {
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}
