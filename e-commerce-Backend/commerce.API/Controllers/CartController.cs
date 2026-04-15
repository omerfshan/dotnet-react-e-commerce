using Commerce.Business.DTO;
using Commerce.Business.Services;
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
        var customerId = Request.Cookies["customerId"];
        var (cartDto, newCustomerId) = await _cartService.GetCartAsync(customerId);

        if (newCustomerId != null)
        {
            SetCustomerCookie(newCustomerId);
        }

        return Ok(cartDto);
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var customerId = Request.Cookies["customerId"];
        var (cartDto, newCustomerId) = await _cartService.AddItemToCartAsync(customerId, productId, quantity);

        if (newCustomerId != null)
        {
            SetCustomerCookie(newCustomerId);
        }

        return CreatedAtAction(nameof(GetCart), cartDto);
    }

    [HttpDelete]
    public async Task<ActionResult<CartDto>> DeleteFromCart(int productId, int quantity)
    {
        var customerId = Request.Cookies["customerId"];
        var (cartDto, newCustomerId) = await _cartService.RemoveItemFromCartAsync(customerId, productId, quantity);

        if (newCustomerId != null)
        {
            SetCustomerCookie(newCustomerId);
        }

        return Ok(cartDto);
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
