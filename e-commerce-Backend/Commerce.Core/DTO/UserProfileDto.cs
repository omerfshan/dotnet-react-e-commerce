namespace Commerce.Core.DTO;

public class UserProfileDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? AddressTitle { get; set; }
    public string? FullAddress { get; set; }
    public string? City { get; set; }
}
