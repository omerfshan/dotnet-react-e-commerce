using Commerce.Core.Interfaces;

namespace Commerce.Entity
{
    public class Category : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public ICollection<ProductCategory> ProductCategories { get; set; }
            = new List<ProductCategory>();
    }
}
