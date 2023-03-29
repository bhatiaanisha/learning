export interface QuestionTags
{
  questionId? : number
  questionTitle : string,
  questionBody : string,
  totalAnswers : number,
  tags? : string,
  questionVotes : number
}

export interface QuestionTags1{
  questionId? : number
  questionTitle : string,
  questionBody : string,
  totalAnswers : number
  tags? : tags[]
  questionVotes : number
}

export interface tags{
  TagName? : string
}
