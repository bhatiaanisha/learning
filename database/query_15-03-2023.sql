CREATE DATABASE WoodenStreet
GO

USE WoodenStreet
GO

use DAY1

CREATE TABLE ObjectTypes
(
	ObjectTypeId int IDENTITY(1,1) PRIMARY KEY,
	ObjectTypeName varchar(30) NOT NULL,
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Objects
(
    ObjectId int IDENTITY(1,1) PRIMARY KEY,
    ObjectTypeId int NOT NULL FOREIGN KEY REFERENCES ObjectTypes(ObjectTypeId),
    ObjectValue varchar(30) NOT NULL,
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Users
(
	UserId int IDENTITY(1,1) PRIMARY KEY,
	UserName varchar(150) NOT NULL,
	MobileNumber bigint NOT NULL,
	PinCode int NOT NULL,
	Email varchar(400) NOT NULL,
	PasswordHash varbinary(200) NOT NULL,
    PasswordSalt varbinary(200) NOT NULL,
	UserType int NOT NULL FOREIGN KEY REFERENCES Objects(ObjectId),
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE FurnitureItems
(
	FurnitureItemId int IDENTITY(1,1) PRIMARY KEY,
	FurnitureItemName varchar(40) NOT NULL,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Category
(
	CategoryId int IDENTITY(1,1) PRIMARY KEY,
	FurnitureItemId int FOREIGN KEY REFERENCES FurnitureItems(FurnitureItemId),
	CategoryName varchar(100) NOT NULL,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE SubCategory
(
	SubCategoryId int IDENTITY(1,1) PRIMARY KEY,
	CategoryId int FOREIGN KEY REFERENCES Category(CategoryId),
	SubCategoryName varchar(300) NOT NULL,
	ImageUrl nvarchar(max),
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Products
(
	ProductId int IDENTITY(1,1) PRIMARY KEY,
	SubCategoryId int FOREIGN KEY REFERENCES SubCategory(SubCategoryId),
	ProductName varchar(max) NOT NULL,
	CompanyName varchar(200),
	IsRated bit,
	Ratings int,
	Reviews int,
	OriginalPrice int,
	DiscountedPrice int,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE ProductOverview
(
	ProductOverviewId int IDENTITY(1,1) PRIMARY KEY,
	ProductId int FOREIGN KEY REFERENCES Products(ProductId),
	Seater varchar(50),
	Material varchar(30),
	Color varchar(25),
	DimensionsInInch varchar(50),
	Mechanism varchar(25),
	DimensionsInCm varchar(50),
	Foam varchar(25),
	WeightCapacity varchar(20),
	Width varchar(20),
	Warranty varchar(25),
	ShipsIn varchar(10),
	DeliveryCondition varchar(30),
	SKU varchar(20),
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Wishlist
(
	WishlistId int IDENTITY(1,1) PRIMARY KEY,
	UserId int FOREIGN KEY REFERENCES Users(UserId),
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE WishlistItems
(
	WishlistItemId int IDENTITY(1,1) PRIMARY KEY,
	WishlistId int FOREIGN KEY REFERENCES Wishlist(WishlistId),
	ProductId int FOREIGN KEY REFERENCES Products(ProductId),
	IsActive bit,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Cart
(
	CartId int IDENTITY(1,1) PRIMARY KEY,
	UserId int FOREIGN KEY REFERENCES Users(UserId),
	CartTotal int,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE CartItems
(
	CartItemId int IDENTITY(1,1) PRIMARY KEY,
	CartId int FOREIGN KEY REFERENCES Cart(CartId),
	ProductId int FOREIGN KEY REFERENCES Products(ProductId),
	CartItemTotal int,
	IsActive bit,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Orders
(
	OrderId int IDENTITY(1,1) PRIMARY KEY,
	CartId int FOREIGN KEY REFERENCES Cart(CartId),
	OrderStatusType int NOT NULL FOREIGN KEY REFERENCES Objects(ObjectId),
	Discount int,
	GrandTotal int,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Payment
(
	PaymentId int IDENTITY(1,1) PRIMARY KEY,
	OrderId int FOREIGN KEY REFERENCES Orders(OrderId),
	TotalAmount int,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

CREATE TABLE Images
(
	ImageId int IDENTITY(1,1) PRIMARY KEY,
	ProductId int FOREIGN KEY REFERENCES Products(ProductId),
	ProductImageUrl nvarchar(max) NOT NULL,
	CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT null
)
GO

ALTER TABLE Users
ADD OTP varchar(7)

SELECT * FROM Users
select * from ObjectTypes
SELECT * FROM Objects
SELECT * FROM FurnitureItems
SELECT * FROM Category
SELECT * FROM SubCategory
SELECT * FROM Products
SELECT * FROM Images
SELECT * FROM ProductOverview

ALTER TABLE Images
ADD CONSTRAINT DF_Images_Modify DEFAULT GETDATE() for [ModifiedDate]

ALTER TABLE Category
ADD ImageUrl nvarchar(max)

select * from employees

update employees
set FirstName = LastName,LastName = FirstName
go

ALTER TABLE Category
DROP COLUMN ImageUrl
