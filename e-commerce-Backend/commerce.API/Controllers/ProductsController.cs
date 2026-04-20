using Commerce.Core.DTO;
using Commerce.Core.Interfaces;
using Commerce.Business.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Commerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
 
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
        {
            var products = await _productService.GetAllAsync(categoryId);
            return Ok(products);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            return Ok(product);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductCreateUpdateDto dto)
        {
            var productId = await _productService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = productId }, new { id = productId });
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductCreateUpdateDto dto)
        {
            await _productService.UpdateAsync(id, dto);
            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Patch(int id, [FromBody] ProductPatchDto dto)
        {
            await _productService.PatchAsync(id, dto);
            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteAsync(id);
            return NoContent();
        }
    }
}
