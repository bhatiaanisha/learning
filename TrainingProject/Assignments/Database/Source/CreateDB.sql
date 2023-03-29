USE [stackoverflow-2396-anisha]
GO

CREATE TABLE ObjectTypes
(
    ObjectTypeId int IDENTITY(1,1) PRIMARY KEY,
    ObjectTypeName varchar(30) NOT NULL,
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE Objects
(
    ObjectId int IDENTITY(1,1) PRIMARY KEY,
    ObjectTypeId int NOT NULL FOREIGN KEY REFERENCES ObjectTypes(ObjectTypeId),
    ObjectValue varchar(30) NOT NULL,
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE Users
(
    UserId int IDENTITY(1,1) PRIMARY KEY,
    DisplayName varchar(100) NOT NULL,
    Email varchar(300) NOT NULL UNIQUE,
    PasswordHash varbinary(200) NOT NULL,
    PasswordSalt varbinary(200) NOT NULL,
    Reputation int NOT NULL DEFAULT 0,
    UserType int NOT NULL FOREIGN KEY REFERENCES Objects(ObjectId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE Questions
(
    QuestionId int IDENTITY(201,1) PRIMARY KEY,
    QuestionTitle varchar(600) NOT NULL,
    QuestionBody nvarchar(max) NOT NULL,
    UserId int NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE Answers
(
    AnswerId int IDENTITY(601,1) PRIMARY KEY,
    AnswerBody nvarchar(max) NOT NULL,
    QuestionId int NOT NULL FOREIGN KEY REFERENCES Questions(QuestionId),
    UserId int NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE Tags
(
    TagId int IDENTITY(1,1) PRIMARY KEY,
    TagName varchar(100) NOT NULL,
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE QuestionTags
(
    QuestionTagId int IDENTITY(1,1) PRIMARY KEY,
    QuestionId int NOT NULL FOREIGN KEY REFERENCES Questions(QuestionId),
    TagId int NOT NULL FOREIGN KEY REFERENCES Tags(TagId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE QuestionVotes
(
    QuestionVoteId int IDENTITY(1,1) PRIMARY KEY,
    QuestionId int NOT NULL FOREIGN KEY REFERENCES Questions(QuestionId),
    UserId int NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    VoteType int NOT NULL FOREIGN KEY REFERENCES Objects(ObjectId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE AnswerVotes
(
    AnswerVoteId int IDENTITY(1,1) PRIMARY KEY,
    AnswerId int NOT NULL FOREIGN KEY REFERENCES Answers(AnswerId),
    UserId int NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    VoteType int NOT NULL FOREIGN KEY REFERENCES Objects(ObjectId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE QuestionComments
(
    QuestionCommentId int IDENTITY(1,1) PRIMARY KEY,
    QuestionCommentBody varchar(500) NOT NULL,
    QuestionId int NOT NULL FOREIGN KEY REFERENCES Questions(QuestionId),
    UserId int NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO

CREATE TABLE AnswerComments
(
    AnswerCommentId int IDENTITY(1,1) PRIMARY KEY,
    AnswerCommentBody varchar(500) NOT NULL,
    AnswerId int NOT NULL FOREIGN KEY REFERENCES Answers(AnswerId),
    UserId int NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CreatedDate datetime2 NOT NULL DEFAULT GETDATE(),
    ModifiedDate datetime2 NOT NULL DEFAULT GETDATE()
)
GO