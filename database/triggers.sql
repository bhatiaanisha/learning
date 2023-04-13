CREATE TRIGGER trgCategoryUpdate
ON Category
FOR UPDATE
AS
	UPDATE Category
	SET ModifiedDate = GETDATE()
	WHERE CategoryId = (SELECT CategoryID
						FROM inserted)
GO