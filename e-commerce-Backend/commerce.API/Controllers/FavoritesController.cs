using System.Security.Claims;
using AutoMapper;
using Commerce.Core.DTO;
using Commerce.DataAccess;
using Commerce.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace commerce.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class FavoritesController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public FavoritesController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetFavorites()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var favorites = await _context.UserFavorites
            .Where(f => f.UserId == userId)
            .Include(f => f.Product)
                .ThenInclude(p => p.ProductCategories)
                    .ThenInclude(pc => pc.Category)
            .Select(f => f.Product)
            .ToListAsync();

        var productDtos = favorites.Select(p => new ProductDto
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
                CategoryId = pc.Category.Id,
                Name = pc.Category.Name
            }).ToList()
        }).ToList();

        return Ok(productDtos);
    }

    [HttpPost("{productId:int}")]
    public async Task<IActionResult> AddFavorite(int productId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var product = await _context.Products.FindAsync(productId);
        if (product == null) return NotFound("Ürün bulunamadı.");

        var existing = await _context.UserFavorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);

        if (existing == null)
        {
            _context.UserFavorites.Add(new UserFavorite
            {
                UserId = userId,
                ProductId = productId
            });
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Ürün favorilere eklendi." });
    }

    [HttpDelete("{productId:int}")]
    public async Task<IActionResult> RemoveFavorite(int productId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var favorite = await _context.UserFavorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);

        if (favorite != null)
        {
            _context.UserFavorites.Remove(favorite);
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Ürün favorilerden çıkarıldı." });
    }
}
