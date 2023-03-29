USE [stackoverflow-2396-anisha]
GO

INSERT INTO ObjectTypes(ObjectTypeName) VALUES ('UserType'),
											   ('VoteType')
GO

INSERT INTO Objects(ObjectTypeId,ObjectValue) VALUES (1,'Admin'),
													 (1,'User'),
													 (2,'PositiveVote'),
													 (2,'NegativeVote')
GO

SELECT * FROM ObjectTypes
SELECT * FROM Objects
GO

INSERT INTO Tags(TagName) VALUES ('javascript'),
								 ('python'),
								 ('java'),
								 ('c#'),
								 ('php')
GO

SELECT * FROM Tags
GO

SELECT * FROM Questions
GO

INSERT INTO Answers(AnswerBody,QuestionId,UserId) VALUES ('The syntax is simple for creating a trigger for Update : CREATE TRIGGER [trgName] ON tblName FOR UPDATE',201,1)

SELECT * FROM Answers
GO


