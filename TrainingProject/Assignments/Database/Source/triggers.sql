USE [stackoverflow-2396-anisha]
GO

CREATE TRIGGER trgTagUpdate
ON Tags
FOR UPDATE
AS
	UPDATE Tags
	SET ModifiedDate = GETDATE()
	WHERE TagId = (SELECT TagId
					FROM inserted)
GO

CREATE TRIGGER trgQuestionUpdate
ON Questions
FOR UPDATE
AS
	UPDATE Questions
	SET ModifiedDate = GETDATE()
	WHERE QuestionId = (SELECT QuestionId
					FROM inserted)
GO



