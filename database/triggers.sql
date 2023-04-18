CREATE TRIGGER trgCategoryUpdate
ON Category
FOR UPDATE
AS
	UPDATE Category
	SET ModifiedDate = GETDATE()
	WHERE CategoryId = (SELECT CategoryID
						FROM inserted)
GO

CREATE TRIGGER trgSubCategoryUpdate
ON SubCategory
FOR UPDATE
AS
	UPDATE SubCategory
	SET ModifiedDate = GETDATE()
	WHERE SubCategoryId = (SELECT SubCategoryId
						FROM inserted)
GO

CREATE TRIGGER trgProductUpdate
ON Products
FOR UPDATE
AS
	UPDATE Products
	SET ModifiedDate = GETDATE()
	WHERE ProductId = (SELECT ProductId
						FROM inserted)
GO