using Commerce.Business.DTO;
using Commerce.DataAccess;
using Commerce.Entity;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Business.Services;

public class CategoryService : ICategoryService
{
    private readonly DataContext _context;

    public CategoryService(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync()
    {
        return await _context.Categories
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductListDto>> GetProductsByCategoryAsync(int categoryId)
    {
        return await _context.Products
            .AsNoTracking()
            .Where(p => p.ProductCategories.Any(pc => pc.CategoryId == categoryId))
            .Select(p => new ProductListDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                IsActive = p.IsActive,
                ImageUrl = p.ImageUrl,
                Stock = p.Stock
            })
            .ToListAsync();
    }
}
