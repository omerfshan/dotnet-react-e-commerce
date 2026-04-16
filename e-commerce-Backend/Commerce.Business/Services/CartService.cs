using AutoMapper;
using Commerce.Core.Interfaces;
using Commerce.Core.DTO;
using Commerce.DataAccess;
using Commerce.Core.Exceptions;
using Commerce.Entity;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Business.Services;

public class CartService : ICartService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public CartService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<(CartDto cart, string? newCustomerId)> GetCartAsync(string? customerId)
    {
        var (cart, newId) = await GetOrCreateAsync(customerId);
        return (_mapper.Map<CartDto>(cart), newId);
    }

    public async Task<(CartDto? cart, string? newCustomerId)> AddItemToCartAsync(string? customerId, int productId, int quantity)
    {
        var (cart, newId) = await GetOrCreateAsync(customerId);

        var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);
        if (product == null)
            throw new NotFoundException($"Ürün (Id: {productId}) bulunamadı.");

        cart.AddItem(productId, quantity);
        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return (_mapper.Map<CartDto>(cart), newId);
        }

        throw new BadRequestException("Ürün sepete eklenemedi.");
    }

    public async Task<(CartDto? cart, string? newCustomerId)> RemoveItemFromCartAsync(string? customerId, int productId, int quantity)
    {
        var (cart, newId) = await GetOrCreateAsync(customerId);
        cart.RemoveItem(productId, quantity);

        var result = await _context.SaveChangesAsync() > 0;
        if (result)
        {
            return (_mapper.Map<CartDto>(cart), newId);
        }

        throw new BadRequestException("Ürün sepetten silinemedi.");
    }

    private async Task<(Cart cart, string? newCustomerId)> GetOrCreateAsync(string? customerId)
    {
        Cart? cart = null;
        string? newCustomerId = null;

        if (!string.IsNullOrEmpty(customerId))
        {
            cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        if (cart is null)
        {
            newCustomerId = Guid.NewGuid().ToString();
            cart = new Cart { CustomerId = newCustomerId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return (cart, newCustomerId);
    }
}
