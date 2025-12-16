using API.Data;
using API.Entity;
using API.Dto;
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

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            var products = await _context.Products.AsNoTracking().ToListAsync();
            return Ok(products);
        }

        // GET: api/products/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _context.Products.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product is null) return NotFound();
            return Ok(product);
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<Product>> Create([FromBody] Product input)
        {
            // Basit validasyon
            if (string.IsNullOrWhiteSpace(input.Name))
                return BadRequest("Name zorunlu.");

            // Id client'tan gelmesin
            input.Id = 0;

            _context.Products.Add(input);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
        }

        // PUT: api/products/5  (tam güncelleme)
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product input)
        {
            if (id != input.Id && input.Id != 0)
                return BadRequest("Id uyuşmuyor.");

            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null) return NotFound();

            // Tam update
            product.Name = input.Name;
            product.Description = input.Description;
            product.Price = input.Price;
            product.IsActive = input.IsActive;
            product.ImageUrl = input.ImageUrl;
            product.Stock = input.Stock;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PATCH: api/products/5  (kısmi güncelleme)
        [HttpPatch("{id:int}")]
      
public async Task<IActionResult> Patch(int id, ProductPatchDto dto)
{
    var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
    if (product == null) return NotFound();

    if (dto.Name != null)
        product.Name = dto.Name;

    if (dto.Price.HasValue)
        product.Price = dto.Price.Value;

    if (dto.IsActive.HasValue)
        product.IsActive = dto.IsActive.Value;
   
    if (dto.Stock.HasValue)
        product.Stock = dto.Stock.Value;

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
