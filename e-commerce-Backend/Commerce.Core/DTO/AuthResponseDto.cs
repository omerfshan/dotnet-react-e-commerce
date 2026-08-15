namespace Commerce.Core.DTO;
public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = new();
}