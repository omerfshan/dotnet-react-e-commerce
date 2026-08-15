using System.Security.Claims;
using Commerce.Core.DTO;
using Commerce.DataAccess;
using Commerce.Entity.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace commerce.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly DataContext _context;

    public OrdersController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetUserOrders()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        var result = orders.Select(o => new OrderDto
        {
            Id = o.Id,
            OrderNumber = o.OrderNumber,
            OrderDate = o.OrderDate,
            FirstName = o.FirstName,
            LastName = o.LastName,
            PhoneNumber = o.PhoneNumber,
            AddressTitle = o.AddressTitle,
            City = o.City,
            FullAddress = o.FullAddress,
            SubTotal = o.SubTotal,
            ShippingFee = o.ShippingFee,
            GrandTotal = o.GrandTotal,
            Status = o.Status.ToString(),
            OrderItems = o.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.ProductName,
                ProductImageUrl = oi.ProductImageUrl,
                Price = oi.Price,
                Quantity = oi.Quantity
            }).ToList()
        }).ToList();

        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

        if (order == null) return NotFound("Sipariş bulunamadı.");

        var result = new OrderDto
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            OrderDate = order.OrderDate,
            FirstName = order.FirstName,
            LastName = order.LastName,
            PhoneNumber = order.PhoneNumber,
            AddressTitle = order.AddressTitle,
            City = order.City,
            FullAddress = order.FullAddress,
            SubTotal = order.SubTotal,
            ShippingFee = order.ShippingFee,
            GrandTotal = order.GrandTotal,
            Status = order.Status.ToString(),
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.ProductName,
                ProductImageUrl = oi.ProductImageUrl,
                Price = oi.Price,
                Quantity = oi.Quantity
            }).ToList()
        };

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == userId);

        if (cart == null || !cart.CartItems.Any())
        {
            return BadRequest("Sepetinizde ürün bulunmamaktadır.");
        }

        var subTotal = cart.CartItems.Sum(item => item.Product.Price * item.Quantity);
        var shippingFee = dto.ShippingOption == "express" ? 49.99m : 0m;
        var grandTotal = subTotal + shippingFee;

        var order = new Order
        {
            OrderNumber = "NOV-" + Random.Shared.Next(100000, 999999),
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            PhoneNumber = dto.PhoneNumber,
            AddressTitle = dto.AddressTitle,
            City = dto.City,
            FullAddress = dto.FullAddress,
            SubTotal = subTotal,
            ShippingFee = shippingFee,
            GrandTotal = grandTotal,
            Status = OrderStatus.Processing,
            OrderItems = cart.CartItems.Select(item => new OrderItem
            {
                ProductId = item.ProductId,
                ProductName = item.Product.Name,
                ProductImageUrl = item.Product.ImageUrl ?? "",
                Price = item.Product.Price,
                Quantity = item.Quantity
            }).ToList()
        };

        _context.Orders.Add(order);

        // Sepeti temizle
        _context.Carts.Remove(cart);

        await _context.SaveChangesAsync();

        var result = new OrderDto
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            OrderDate = order.OrderDate,
            FirstName = order.FirstName,
            LastName = order.LastName,
            PhoneNumber = order.PhoneNumber,
            AddressTitle = order.AddressTitle,
            City = order.City,
            FullAddress = order.FullAddress,
            SubTotal = order.SubTotal,
            ShippingFee = order.ShippingFee,
            GrandTotal = order.GrandTotal,
            Status = order.Status.ToString(),
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.ProductName,
                ProductImageUrl = oi.ProductImageUrl,
                Price = oi.Price,
                Quantity = oi.Quantity
            }).ToList()
        };

        return Ok(result);
    }

    [Authorize(Roles = "Admin,Worker")]
    [HttpGet("admin/all")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        var result = orders.Select(o => new OrderDto
        {
            Id = o.Id,
            OrderNumber = o.OrderNumber,
            OrderDate = o.OrderDate,
            FirstName = o.FirstName,
            LastName = o.LastName,
            PhoneNumber = o.PhoneNumber,
            AddressTitle = o.AddressTitle,
            City = o.City,
            FullAddress = o.FullAddress,
            SubTotal = o.SubTotal,
            ShippingFee = o.ShippingFee,
            GrandTotal = o.GrandTotal,
            Status = o.Status.ToString(),
            OrderItems = o.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.ProductName,
                ProductImageUrl = oi.ProductImageUrl,
                Price = oi.Price,
                Quantity = oi.Quantity
            }).ToList()
        }).ToList();

        return Ok(result);
    }

    [Authorize(Roles = "Admin,Worker")]
    [HttpPut("admin/{id:int}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto dto)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound("Sipariş bulunamadı.");

        if (Enum.TryParse<OrderStatus>(dto.Status, true, out var parsedStatus))
        {
            order.Status = parsedStatus;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Sipariş durumu başarıyla güncellendi.", status = order.Status.ToString() });
        }

        return BadRequest("Geçersiz sipariş durumu.");
    }
}
