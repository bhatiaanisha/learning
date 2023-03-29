export interface QuestionDetails{
  questionId : number,
  questionTitle : string,
  questionBody : string,
  displayName : string,
  createdDate : Date,
  questionVotes : number,
  tags? : string
}

export interface QuestionDetails1{
  questionId : number,
  questionTitle : string,
  questionBody : string,
  displayName : string,
  createdDate : Date,
  questionVotes : number,
  tags? : tags[]
}

export interface tags{
  TagName : string
}
