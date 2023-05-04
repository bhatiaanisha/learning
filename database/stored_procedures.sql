-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <22/03/2023>
-- Description:	<Created stored procedure for getting all the Products for /products page>
-- =============================================

IF OBJECT_ID ( 'uspGetProducts') IS NOT NULL   
    DROP PROCEDURE uspGetProducts;  
GO

CREATE PROCEDURE uspGetProducts
AS
	SELECT p.ProductId,p.ProductName,p.CompanyName,p.IsRated,p.Ratings,p.DiscountedPrice,p.OriginalPrice,i.ProductImageUrl,sc.SubCategoryName,p.CreatedDate,p.ModifiedDate
	FROM Products p
	INNER JOIN Images i ON i.ProductId = p.ProductId
	JOIN SubCategory sc ON p.SubCategoryId = sc.SubCategoryId
GO

EXEC uspGetProducts
GO

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <03/05/2023>
-- Description:	<Created stored procedure for getting all the Products through fetching item name from query params>
-- =============================================

IF OBJECT_ID ( 'uspGetProductsByQuery') IS NOT NULL   
    DROP PROCEDURE uspGetProductsByQuery;  
GO

CREATE PROCEDURE uspGetProductsByQuery @ItemName varchar(100)
AS
	SELECT p.ProductId,p.ProductName,p.CompanyName,p.IsRated,p.Ratings,p.DiscountedPrice,p.OriginalPrice,i.ProductImageUrl,sc.SubCategoryName,p.CreatedDate,p.ModifiedDate
	FROM FurnitureItems f
	JOIN Category c ON c.FurnitureItemId = f.FurnitureItemId
	JOIN SubCategory sc ON sc.CategoryId = c.CategoryId
	JOIN Products p ON p.SubCategoryId = sc.SubCategoryId
	JOIN Images i ON i.ProductId = p.ProductId
	WHERE f.FurnitureItemName = 'Storage'
GO

EXEC uspGetProductsByQuery @ItemName = 'Dining & Kitchen'

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <22/03/2023>
-- Description:	<Created stored procedure for getting details for /product-detail page based on particular product id>
-- =============================================

select * from Products
select * from ProductOverview

IF OBJECT_ID ( 'uspGetProductDetails') IS NOT NULL   
    DROP PROCEDURE uspGetProductDetails;  
GO

CREATE PROCEDURE uspGetProductDetails @ProductId int
AS
	SELECT p.ProductId,p.SubCategoryId,p.ProductName,p.CompanyName,p.IsRated,p.Ratings,p.Reviews,p.OriginalPrice,p.DiscountedPrice,p.CreatedDate AS ProductCreatedDate,i.ImageId,i.ProductImageUrl,i.CreatedDate AS ImageCreatedDate,po.ProductOverviewId,po.Seater,po.Material,po.Color,po.DimensionsInInch,po.Mechanism,po.DimensionsInCm,po.Foam,po.WeightCapacity,po.Width,po.Warranty,po.ShipsIn,po.DeliveryCondition,po.SKU,po.CreatedDate AS OverviewCreatedDate
	FROM Products p
	JOIN ProductOverview po ON p.ProductId = po.ProductId
	JOIN Images i ON i.ProductId = po.ProductId
	WHERE p.ProductId = @ProductId
GO

EXEC uspGetProductDetails @ProductId = 2
GO

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <02/05/2023>
-- Description:	<Created stored procedure for wishlist items based on user id>
-- =============================================

IF OBJECT_ID ( 'uspGetWishlistItems') IS NOT NULL   
    DROP PROCEDURE uspGetWishlistItems;  
GO

CREATE PROCEDURE uspGetWishlistItems @UserId int
AS
	SELECT w.WishlistId,w.UserId,wi.WishlistItemId,wi.ProductId,wi.IsActive,p.ProductName,p.DiscountedPrice,p.OriginalPrice,po.SKU,i.ProductImageUrl
	FROM Wishlist w
	JOIN WishlistItems wi ON wi.WishlistId = w.WishlistId
	JOIN Products p ON p.ProductId = wi.ProductId
	JOIN ProductOverview po ON po.ProductId = p.ProductId
	JOIN Images i ON i.ProductId = p.ProductId
	WHERE w.UserId = @UserId AND wi.IsActive = 1
GO

EXEC uspGetWishlistItems @UserId = 3
GO