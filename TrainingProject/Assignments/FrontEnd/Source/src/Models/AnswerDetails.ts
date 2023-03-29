export interface AnswerDetails {
  answerId: number,
  answerBody: string,
  questionId: number,
  createdDate: Date,
  displayName: string,
  answerVotes : number,
  comments?: string
}

export interface AnswerDetails1 {
  answerId: number,
  answerBody: string,
  questionId: number,
  createdDate: Date,
  displayName: string,
  answerVotes : number,
  comments?: Comment[]
}
export interface Comment {
  AnswerCommentBody?: string,
  CommentDate?: Date,
  Username?: string
}


