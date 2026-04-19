using Commerce.Core.DTO;
using Commerce.Core.Interfaces;
using Commerce.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetCategoriesAsync();
            return Ok(categories);
        }

        // [HttpGet("{categoryId:int}")]
        // public async Task<ActionResult<List<ProductListDto>>> GetProductsByCategory(int categoryId)
        // {
        //     var products = await _categoryService.GetProductsByCategoryAsync(categoryId);
        //     return Ok(products);
        // }
    }
}
