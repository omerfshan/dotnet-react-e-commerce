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
        [Authorize(Roles = "Admin,Worker")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductCreateUpdateDto dto)
        {
            var productId = await _productService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = productId }, new { id = productId });
        }
        [Authorize(Roles = "Admin,Worker")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductCreateUpdateDto dto)
        {
            await _productService.UpdateAsync(id, dto);
            return NoContent();
        }
        [Authorize(Roles = "Admin,Worker")]
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Patch(int id, [FromBody] ProductPatchDto dto)
        {
            await _productService.PatchAsync(id, dto);
            return NoContent();
        }
        [Authorize(Roles = "Admin,Worker")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteAsync(id);
            return NoContent();
        }
        [Authorize(Roles = "Admin,Worker")]
        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile? file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Lütfen geçerli bir resim dosyası seçiniz.");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
                return BadRequest("Sadece .jpg, .jpeg, .png veya .webp formatında resim yükleyebilirsiniz.");

            var fileName = $"{Guid.NewGuid()}{extension}";
            var imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            var filePath = Path.Combine(imagesFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { fileName });
        }
    }
}
