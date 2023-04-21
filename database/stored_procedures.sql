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
-- Create date: <21/04/2023>
-- Description:	<Created stored procedure for getting details for edit form of product>
-- =============================================

/* IF OBJECT_ID ( 'uspGetProductEditDetails') IS NOT NULL   
    DROP PROCEDURE uspGetProductEditDetails;  
GO

CREATE PROCEDURE uspGetProductEditDetails @ProductId int
AS
	SELECT p.ProductId,p.SubCategoryId,p.ProductName,p.CompanyName,p.IsRated,p.Ratings,p.Reviews,p.OriginalPrice,p.DiscountedPrice,p.CreatedDate AS ProductCreatedDate,i.ImageId,i.ProductImageUrl,i.CreatedDate AS ImageCreatedDate,po.ProductOverviewId,po.Seater,po.Material,po.Color,po.DimensionsInInch,po.Mechanism,po.DimensionsInCm,po.Foam,po.WeightCapacity,po.Width,po.Warranty,po.ShipsIn,po.DeliveryCondition,po.SKU,po.CreatedDate AS OverviewCreatedDate
	FROM Products p
	JOIN Images i ON i.ProductId = p.ProductId
	JOIN ProductOverview po ON po.ProductId = p.ProductId
	WHERE p.ProductId = @ProductId
GO

EXEC uspGetProductEditDetails @ProductId = 12
GO */
