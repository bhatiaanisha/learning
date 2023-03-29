

export interface Answer{
  answerId? : number,
  answerBody : string,
  questionId? : number,
  userId? : number,
  createdDate? : Date,
  modifiedDate? : Date
}

export interface AnswerCount{
  totalAnswers : number
}
