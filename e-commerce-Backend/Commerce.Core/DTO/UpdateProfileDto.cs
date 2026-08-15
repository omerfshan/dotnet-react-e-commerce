using System.ComponentModel.DataAnnotations;

namespace Commerce.Core.DTO;

public class UpdateProfileDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    public string? PhoneNumber { get; set; }
    public string? AddressTitle { get; set; }
    public string? FullAddress { get; set; }
    public string? City { get; set; }
}
