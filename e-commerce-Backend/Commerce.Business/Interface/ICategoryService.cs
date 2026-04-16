using Commerce.Core.DTO;
using Commerce.Entity;

namespace Commerce.Business.Services;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetCategoriesAsync();
    Task<IEnumerable<ProductListDto>> GetProductsByCategoryAsync(int categoryId);
}
