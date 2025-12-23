using API.Data;
using API.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public CategoriesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories
                .AsNoTracking()
                .OrderBy(c => c.Name)
                .ToListAsync();

            return Ok(categories);
        }
        [HttpGet("{categoryId:int}")]
        public async Task<ActionResult<List<ProductListDto>>> GetProductsByCategory(int categoryId)
        {
            var products = await _context.Products
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

            return Ok(products);
        }

    }

}
