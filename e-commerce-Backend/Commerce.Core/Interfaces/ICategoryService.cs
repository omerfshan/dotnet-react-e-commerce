using Commerce.Core.DTO;

namespace Commerce.Core.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
    Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId);
}
