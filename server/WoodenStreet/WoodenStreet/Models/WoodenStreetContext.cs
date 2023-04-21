using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WoodenStreet.Models
{
    public partial class WoodenStreetContext : DbContext
    {
        public WoodenStreetContext()
        {
        }

        public WoodenStreetContext(DbContextOptions<WoodenStreetContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<CartItem> CartItems { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<FurnitureItem> FurnitureItems { get; set; } = null!;
        public virtual DbSet<Image> Images { get; set; } = null!;
        public virtual DbSet<Object> Objects { get; set; } = null!;
        public virtual DbSet<ObjectType> ObjectTypes { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductDTO> ProductDTOs { get; set; } = null!;
        public virtual DbSet<ProductDetailDTO> ProductDetailDTOs { get; set; } = null!;
        //public virtual DbSet<ProductEditDTO> ProductEditDTOs { get; set; } = null!;
        public virtual DbSet<ProductOverview> ProductOverviews { get; set; } = null!;
        public virtual DbSet<SubCategory> SubCategories { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Wishlist> Wishlists { get; set; } = null!;
        public virtual DbSet<WishlistItem> WishlistItems { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Server=PC0771\\MSSQL2019;Database=WoodenStreet;Integrated Security=True;Encrypt=False");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Cart__UserId__656C112C");
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK__CartItems__CartI__6A30C649");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__CartItems__Produ__6B24EA82");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.FurnitureItem)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.FurnitureItemId)
                    .HasConstraintName("FK__Category__Furnit__47DBAE45");
            });

            modelBuilder.Entity<FurnitureItem>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FurnitureItemName)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Images__ProductI__7A672E12");
            });

            modelBuilder.Entity<Object>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ObjectValue)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.ObjectType)
                    .WithMany(p => p.Objects)
                    .HasForeignKey(d => d.ObjectTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Objects__ObjectT__3A81B327");
            });

            modelBuilder.Entity<ObjectType>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ObjectTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK__Orders__CartId__6FE99F9F");

                entity.HasOne(d => d.OrderStatusTypeNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OrderStatusType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Orders__OrderSta__70DDC3D8");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("Payment");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__Payment__OrderId__75A278F5");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.CompanyName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ProductName).IsUnicode(false);

                entity.HasOne(d => d.SubCategory)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SubCategoryId)
                    .HasConstraintName("FK__Products__SubCat__5165187F");
            });

            modelBuilder.Entity<ProductOverview>(entity =>
            {
                entity.ToTable("ProductOverview");

                entity.Property(e => e.Color)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeliveryCondition)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DimensionsInCm)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DimensionsInInch)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Foam)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Material)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Mechanism)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Seater)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ShipsIn)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Sku)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("SKU");

                entity.Property(e => e.Warranty)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.WeightCapacity)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Width)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductOverviews)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductOv__Produ__5629CD9C");
            });

            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.ToTable("SubCategory");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.SubCategoryName)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.SubCategories)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__SubCatego__Categ__4CA06362");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Otp)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .HasColumnName("OTP");

                entity.Property(e => e.PasswordHash).HasMaxLength(200);

                entity.Property(e => e.PasswordSalt).HasMaxLength(200);

                entity.Property(e => e.UserName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.UserTypeNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Users__UserType__3F466844");
            });

            modelBuilder.Entity<Wishlist>(entity =>
            {
                entity.ToTable("Wishlist");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Wishlists)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Wishlist__UserId__5AEE82B9");
            });

            modelBuilder.Entity<WishlistItem>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.WishlistItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__WishlistI__Produ__60A75C0F");

                entity.HasOne(d => d.Wishlist)
                    .WithMany(p => p.WishlistItems)
                    .HasForeignKey(d => d.WishlistId)
                    .HasConstraintName("FK__WishlistI__Wishl__5FB337D6");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
