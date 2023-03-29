-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <30/08/2022>
-- Description:	<Created stored procedure for getting all the details>
-- =============================================

IF OBJECT_ID ( 'uspGetAllDetails') IS NOT NULL   
    DROP PROCEDURE uspGetAllDetails;  
GO

CREATE PROCEDURE uspGetAllDetails
AS
	SELECT distinct q.QuestionId,q.QuestionTitle,q.QuestionBody,COUNT(a.QuestionId) AS TotalAnswers,
	(SELECT t.TagName
	FROM QuestionTags qtt
	JOIN Tags t ON t.TagId = qtt.TagId
	JOIN Questions qq ON qtt.QuestionId = qq.QuestionId
	WHERE q.QuestionId = qq.QuestionId
	FOR JSON PATH)as tags,
	(SELECT COUNT(qv.QuestionId)
	FROM QuestionVotes qv
	JOIN Questions qqq ON qv.QuestionId = qqq.QuestionId
	WHERE qv.QuestionId = q.QuestionId)AS QuestionVotes
	FROM Questions q
	LEFT JOIN QuestionTags qt ON q.QuestionId = qt.QuestionId
	LEFT JOIN Answers a ON a.QuestionId = q.QuestionId
	LEFT JOIN QuestionVotes qv ON qv.QuestionId = q.QuestionId
	GROUP BY q.QuestionId,q.QuestionTitle,q.QuestionBody
GO

EXEC uspGetAllDetails
GO

SELECT * FROM Tags
GO

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <30/08/2022>
-- Description:	<Created stored procedure for getting question details based on a particular question id>
-- =============================================

IF OBJECT_ID ( 'uspGetQuestionDetails') IS NOT NULL   
    DROP PROCEDURE uspGetQuestionDetails;  
GO

CREATE PROCEDURE uspGetQuestionDetails @QuestionId int
AS
	SELECT q.QuestionId,q.QuestionTitle,q.QuestionBody,u.DisplayName,q.CreatedDate,
	(SELECT tt.TagName
	FROM Tags tt
	JOIN QuestionTags qtt ON qtt.TagId = tt.TagId
	JOIN Questions qq ON qq.QuestionId = qtt.QuestionId
	WHERE qq.QuestionId = q.QuestionId
	FOR JSON PATH)AS Tags,
	(SELECT COUNT(qvv.QuestionId)
	FROM QuestionVotes qvv
	JOIN Questions qqq ON qqq.QuestionId = qvv.QuestionId
	WHERE qvv.QuestionId = q.QuestionId)AS QuestionVotes
	FROM Questions q
	JOIN Users u ON q.UserId = u.UserId 
	WHERE q.QuestionId = @QuestionId
GO

EXEC uspGetQuestionDetails @QuestionId = 214


-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <27/08/2022>
-- Description:	<Created stored procedure for getting answer details based on a particular question id>
-- =============================================

IF OBJECT_ID ( 'uspAnswerDetails') IS NOT NULL   
    DROP PROCEDURE uspAnswerDetails;  
GO

CREATE PROCEDURE uspAnswerDetails @QuestionId int
AS
	SELECT a.AnswerId,a.AnswerBody,a.QuestionId,a.CreatedDate,u.DisplayName,
	(SELECT acc.AnswerCommentBody,acc.CreatedDate AS CommentDate,uc.DisplayName AS Username
	FROM AnswerComments acc
	LEFT JOIN Users uc ON uc.UserId = acc.UserId
	WHERE acc.AnswerId = a.AnswerId
	FOR JSON PATH) as Comments,
	(SELECT COUNT(av.AnswerId)
	FROM AnswerVotes av 
	JOIN Answers aa ON aa.AnswerId = av.AnswerId
	WHERE av.AnswerId = a.AnswerId)AS AnswerVotes
	FROM Answers a 
	LEFT JOIN Questions q ON q.QuestionId = a.QuestionId
	LEFT JOIN Users u ON u.UserId = a.UserId
	WHERE a.QuestionId = @QuestionId
GO

EXEC uspAnswerDetails @QuestionId = 201
GO

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <28/08/2022>
-- Description:	<Created stored procedure for getting question comments based on a particular question id>
-- =============================================

IF OBJECT_ID ( 'uspQuestionComments') IS NOT NULL   
    DROP PROCEDURE uspQuestionComments;  
GO

CREATE PROCEDURE uspQuestionComments @QuestionId int
AS
	SELECT qc.QuestionCommentId,qc.QuestionId,qc.QuestionCommentBody,qc.CreatedDate,u.DisplayName
	FROM QuestionComments qc
	JOIN Questions q ON q.QuestionId = qc.QuestionId
	JOIN Users u ON u.UserId = qc.UserId
	WHERE @QuestionId = qc.QuestionId
GO

EXEC uspQuestionComments @QuestionId = 204
GO

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <28/08/2022>
-- Description:	<Created stored procedure for getting answer comments based on a particular answer id>
-- =============================================

IF OBJECT_ID ( 'uspAnswerComments') IS NOT NULL   
    DROP PROCEDURE uspAnswerComments;  
GO

CREATE PROCEDURE uspAnswerComments @AnswerId int
AS
	SELECT ac.AnswerCommentId,ac.AnswerId,ac.AnswerCommentBody,ac.CreatedDate,u.DisplayName
	FROM AnswerComments ac
	JOIN Answers a ON a.AnswerId = ac.AnswerId
	JOIN Users u ON u.UserId = ac.UserId
	WHERE @AnswerId = ac.AnswerId
GO

EXEC uspAnswerComments @AnswerId = 607
GO

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <30/08/2022>
-- Description:	<Created stored procedure for getting details based on a particular tagname>
-- =============================================

IF OBJECT_ID ( 'uspGetDetailsByTagName') IS NOT NULL   
    DROP PROCEDURE uspGetDetailsByTagName;  
GO

CREATE PROCEDURE uspGetDetailsByTagName @TagName varchar(100)
AS
	SELECT q.QuestionId,q.QuestionTitle,q.QuestionBody,
	(SELECT tt.TagName
	FROM Tags tt
	WHERE tt.TagId = t.TagId
	for json path)tags
	FROM Tags t
	JOIN QuestionTags qt on qt.TagId = t.TagId
	JOIN Questions q on q.QuestionId = qt.QuestionId
	WHERE t.TagName = @TagName
GO

EXEC uspGetDetailsByTagName @TagName = 'dotnet'
GO

-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <30/08/2022>
-- Description:	<Created stored procedure for search functionality>
-- =============================================

IF OBJECT_ID ( 'uspSearch') IS NOT NULL   
    DROP PROCEDURE uspSearch;  
GO

CREATE PROCEDURE uspSearch @search varchar(600)
AS
	SELECT distinct q.QuestionId,q.QuestionTitle,q.QuestionBody,
	(SELECT t.TagName
	FROM QuestionTags qtt
	JOIN Tags t ON t.TagId = qtt.TagId
	JOIN Questions qq ON qtt.QuestionId = qq.QuestionId
	WHERE q.QuestionId = qq.QuestionId
	FOR JSON PATH)as tags
	FROM Questions q
	LEFT JOIN QuestionTags qt ON q.QuestionId = qt.QuestionId
	WHERE q.QuestionTitle LIKE '%'+@search+'%'
GO

EXEC uspSearch @search = 'how to'
GO


-- =============================================
-- Author:		<Anisha Bhatia>
-- Create date: <30/08/2022>
-- Description:	<Created stored procedure for count of answers>
-- =============================================


IF OBJECT_ID ( 'uspCountAnswers') IS NOT NULL   
    DROP PROCEDURE uspCountAnswers;  
GO

CREATE PROCEDURE uspCountAnswers @QuestionId int
AS
	SELECT COUNT(AnswerId) AS TotalAnswers
	FROM Answers a
	JOIN Questions q ON q.QuestionId = a.QuestionId
	WHERE q.QuestionId = @QuestionId
GO

exec uspCountAnswers @QuestionId = 214





