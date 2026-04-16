using Commerce.Core.DTO;

namespace Commerce.Core.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
    Task<IEnumerable<ProductListDto>> GetProductsByCategoryAsync(int categoryId);
}
