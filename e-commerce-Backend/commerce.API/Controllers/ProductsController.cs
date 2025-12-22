using API.Data;
using API.Dto;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/products  ✅ kategorileriyle birlikte
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                .AsNoTracking()
                .Include(p => p.ProductCategories)
                    .ThenInclude(pc => pc.Category)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.IsActive,
                    p.ImageUrl,
                    p.Stock,
                    Categories = p.ProductCategories.Select(pc => new
                    {
                        pc.CategoryId,
                        pc.Category.Name
                    })
                })
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/products/5 ✅ kategorileriyle birlikte
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products
                .AsNoTracking()
                .Include(p => p.ProductCategories)
                    .ThenInclude(pc => pc.Category)
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.IsActive,
                    p.ImageUrl,
                    p.Stock,
                    Categories = p.ProductCategories.Select(pc => new
                    {
                        pc.CategoryId,
                        pc.Category.Name
                    })
                })
                .FirstOrDefaultAsync();

            if (product is null) return NotFound();
            return Ok(product);
        }

        // POST: api/products ✅ CategoryIds ile create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductCreateUpdateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name zorunlu.");

            var uniqueIds = dto.CategoryIds.Distinct().ToList();

            // kategori id'leri geçerli mi?
            var validCategoryIds = await _context.Categories
                .Where(c => uniqueIds.Contains(c.Id))
                .Select(c => c.Id)
                .ToListAsync();

            if (validCategoryIds.Count != uniqueIds.Count)
                return BadRequest("Geçersiz categoryId var.");

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

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, new { product.Id });
        }

        // PUT: api/products/5 ✅ tam update + kategorileri resetle
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductCreateUpdateDto dto)
        {
            var product = await _context.Products
                .Include(p => p.ProductCategories)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product is null) return NotFound();

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name zorunlu.");

            var uniqueIds = dto.CategoryIds.Distinct().ToList();

            var validCategoryIds = await _context.Categories
                .Where(c => uniqueIds.Contains(c.Id))
                .Select(c => c.Id)
                .ToListAsync();

            if (validCategoryIds.Count != uniqueIds.Count)
                return BadRequest("Geçersiz categoryId var.");

            // alanlar
            product.Name = dto.Name.Trim();
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.IsActive = dto.IsActive;
            product.ImageUrl = dto.ImageUrl;
            product.Stock = dto.Stock;

            // join reset
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
            return NoContent();
        }

        // PATCH: api/products/5 ✅ kısmi update + isterse kategori güncelle
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Patch(int id, [FromBody] ProductPatchDto dto)
        {
            var product = await _context.Products
                .Include(p => p.ProductCategories)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product is null) return NotFound();

            if (dto.Name != null)
                product.Name = dto.Name.Trim();

            if (dto.Price.HasValue)
                product.Price = dto.Price.Value;

            if (dto.IsActive.HasValue)
                product.IsActive = dto.IsActive.Value;

            if (dto.Stock.HasValue)
                product.Stock = dto.Stock.Value;

            // kategori patch
            if (dto.CategoryIds != null)
            {
                var uniqueIds = dto.CategoryIds.Distinct().ToList();

                var validCategoryIds = await _context.Categories
                    .Where(c => uniqueIds.Contains(c.Id))
                    .Select(c => c.Id)
                    .ToListAsync();

                if (validCategoryIds.Count != uniqueIds.Count)
                    return BadRequest("Geçersiz categoryId var.");

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
            return NoContent();
        }

        // DELETE: api/products/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
