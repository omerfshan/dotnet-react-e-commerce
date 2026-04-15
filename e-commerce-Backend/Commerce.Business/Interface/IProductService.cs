using Commerce.Business.DTO;
using Commerce.Entity;

namespace Commerce.Business.Services;

public interface IProductService
{
    Task<IEnumerable<ProductListDto>> GetAllAsync();
    Task<ProductListDto?> GetByIdAsync(int id);
    Task<Product> CreateAsync(ProductCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, ProductCreateUpdateDto dto);
    Task<bool> PatchAsync(int id, ProductPatchDto dto);
    Task<bool> DeleteAsync(int id);
}
