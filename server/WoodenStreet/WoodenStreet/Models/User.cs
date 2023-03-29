using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WoodenStreet.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public long MobileNumber { get; set; }

    public int PinCode { get; set; }

    public string Email { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public int UserType { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime ModifiedDate { get; set; }

    public string? Otp { get; set; }

    public virtual ICollection<Cart> Carts { get; } = new List<Cart>();

    public virtual Object UserTypeNavigation { get; set; } = null!;

    public virtual ICollection<Wishlist> Wishlists { get; } = new List<Wishlist>();
}

[Keyless]
public class UserRegisterDTO
{
    [Required]
    public string UserName { get; set; } = null!;

    [Required]
    public long MobileNumber { get; set; }

    [Required]
    public int PinCode { get; set; }

    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}

[Keyless]
public class UserLoginByPasswordDTO
{
    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}

[Keyless]
public class UserLoginByOtpDTO
{
    [Required]
    public string? Otp { get; set; }
}