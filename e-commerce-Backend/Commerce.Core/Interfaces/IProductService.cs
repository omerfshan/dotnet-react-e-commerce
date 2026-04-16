using Commerce.Core.DTO;

namespace Commerce.Core.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductListDto>> GetAllAsync();
    Task<ProductListDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(ProductCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, ProductCreateUpdateDto dto);
    Task<bool> PatchAsync(int id, ProductPatchDto dto);
    Task<bool> DeleteAsync(int id);
}
