using API.Entity;
using API.Dto;
using AutoMapper;

namespace API.Profiles
{
    public class CartProfile : Profile
    {
        public CartProfile()
        {
            CreateMap<Cart, CartDto>()
                .ForMember(dest => dest.CartId, opt => opt.MapFrom(src => src.CartId));

            CreateMap<CartItem, CartItemDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Product.ImageUrl));
        }
    }
}
