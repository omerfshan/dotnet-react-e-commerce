using System.Security.Claims;
using Commerce.Core.DTO;
using Commerce.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        var customerId = await GetEffectiveCustomerIdAsync();
        var (cartDto, newCustomerId) = await _cartService.GetCartAsync(customerId);

        if (newCustomerId != null && !(User.Identity?.IsAuthenticated ?? false))
        {
            SetCustomerCookie(newCustomerId);
        }

        return Ok(cartDto);
    }
 
    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var customerId = await GetEffectiveCustomerIdAsync();
        var (cartDto, newCustomerId) = await _cartService.AddItemToCartAsync(customerId, productId, quantity);

        if (newCustomerId != null && !(User.Identity?.IsAuthenticated ?? false))
        {
            SetCustomerCookie(newCustomerId);
        }

        return Ok(cartDto);
    }

    [HttpDelete]
    public async Task<ActionResult<CartDto>> DeleteFromCart(int productId, int quantity)
    {
        var customerId = await GetEffectiveCustomerIdAsync();
        var (cartDto, newCustomerId) = await _cartService.RemoveItemFromCartAsync(customerId, productId, quantity);

        if (newCustomerId != null && !(User.Identity?.IsAuthenticated ?? false))
        {
            SetCustomerCookie(newCustomerId);
        }

        return Ok(cartDto);
    }

    private async Task<string> GetEffectiveCustomerIdAsync()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var anonId = Request.Cookies["customerId"];

        if (!string.IsNullOrEmpty(userId))
        {
            if (!string.IsNullOrEmpty(anonId))
            {
                await _cartService.MergeCartsAsync(userId, anonId);
                Response.Cookies.Delete("customerId");
            }
            return userId;
        }

        return anonId ?? string.Empty;
    }

    private void SetCustomerCookie(string customerId)
    {
        var cookiesOptions = new CookieOptions
        {
            Expires = DateTime.Now.AddMonths(1),
            IsEssential = true
        };
        Response.Cookies.Append("customerId", customerId, cookiesOptions);
    }
}
