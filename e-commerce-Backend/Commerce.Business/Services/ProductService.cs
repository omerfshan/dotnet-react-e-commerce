using Commerce.Business.DTO;
using Commerce.DataAccess;
using Commerce.Entity;
using Commerce.Core.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Business.Services;

public class ProductService : IProductService
{
    private readonly DataContext _context;

    public ProductService(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductListDto>> GetAllAsync()
    {
        return await _context.Products
            .AsNoTracking()
            .Include(p => p.ProductCategories)
                .ThenInclude(pc => pc.Category)
            .Select(p => new ProductListDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                IsActive = p.IsActive,
                ImageUrl = p.ImageUrl,
                Stock = p.Stock,
                Categories = p.ProductCategories.Select(pc => new CategoryDto
                {
                    CategoryId = pc.CategoryId,
                    Name = pc.Category.Name
                }).ToList()
            })
            .ToListAsync();
    }

    public async Task<ProductListDto?> GetByIdAsync(int id)
    {
        var product = await _context.Products
            .AsNoTracking()
            .Include(p => p.ProductCategories)
                .ThenInclude(pc => pc.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProductListDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                IsActive = p.IsActive,
                ImageUrl = p.ImageUrl,
                Stock = p.Stock,
                Categories = p.ProductCategories.Select(pc => new CategoryDto
                {
                    CategoryId = pc.CategoryId,
                    Name = pc.Category.Name
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (product == null)
            throw new NotFoundException($"Ürün (Id: {id}) bulunamadı.");

        return product;
    }

    public async Task<Product> CreateAsync(ProductCreateUpdateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            throw new BadRequestException("Name zorunlu.");

        var uniqueIds = dto.CategoryIds.Distinct().ToList();
        var validCategoryIds = await _context.Categories
            .Where(c => uniqueIds.Contains(c.Id))
            .Select(c => c.Id)
            .ToListAsync();

        if (validCategoryIds.Count != uniqueIds.Count)
            throw new BadRequestException("Geçersiz categoryId var.");

        var product = new Product
        {
            Name = dto.Name.Trim(),
            Description = dto.Description,
            Price = dto.Price,
            IsActive = dto.IsActive,
            ImageUrl = dto.ImageUrl,
            Stock = dto.Stock,
            ProductCategories = validCategoryIds.Select(cid => new ProductCategory
            {
                CategoryId = cid
            }).ToList()
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<bool> UpdateAsync(int id, ProductCreateUpdateDto dto)
    {
        var product = await _context.Products
            .Include(p => p.ProductCategories)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product is null) throw new NotFoundException($"Ürün (Id: {id}) bulunamadı.");

        if (string.IsNullOrWhiteSpace(dto.Name))
            throw new BadRequestException("Name zorunlu.");

        var uniqueIds = dto.CategoryIds.Distinct().ToList();

        var validCategoryIds = await _context.Categories
            .Where(c => uniqueIds.Contains(c.Id))
            .Select(c => c.Id)
            .ToListAsync();

        if (validCategoryIds.Count != uniqueIds.Count)
            throw new BadRequestException("Geçersiz categoryId var.");

        product.Name = dto.Name.Trim();
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.IsActive = dto.IsActive;
        product.ImageUrl = dto.ImageUrl;
        product.Stock = dto.Stock;

        product.ProductCategories.Clear();
        foreach (var cid in validCategoryIds)
        {
            product.ProductCategories.Add(new ProductCategory
            {
                ProductId = product.Id,
                CategoryId = cid
            });
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> PatchAsync(int id, ProductPatchDto dto)
    {
        var product = await _context.Products
            .Include(p => p.ProductCategories)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product is null) throw new NotFoundException($"Ürün (Id: {id}) bulunamadı.");

        if (dto.Name != null)
            product.Name = dto.Name.Trim();

        if (dto.Price.HasValue)
            product.Price = dto.Price.Value;

        if (dto.IsActive.HasValue)
            product.IsActive = dto.IsActive.Value;

        if (dto.Stock.HasValue)
            product.Stock = dto.Stock.Value;

        if (dto.CategoryIds != null)
        {
            var uniqueIds = dto.CategoryIds.Distinct().ToList();

            var validCategoryIds = await _context.Categories
                .Where(c => uniqueIds.Contains(c.Id))
                .Select(c => c.Id)
                .ToListAsync();

            if (validCategoryIds.Count != uniqueIds.Count)
                throw new BadRequestException("Geçersiz categoryId var.");

            product.ProductCategories.Clear();
            foreach (var cid in validCategoryIds)
            {
                product.ProductCategories.Add(new ProductCategory
                {
                    ProductId = product.Id,
                    CategoryId = cid
                });
            }
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (product is null) throw new NotFoundException($"Ürün (Id: {id}) bulunamadı.");

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
}
