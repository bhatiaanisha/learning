export interface askQuestion {
  questionId?: number,
  questionTitle: string,
  questionBody: string,
  userId: number,
  createdDate?: Date,
  modifiedDate?: Date,
  questionTags: questionTags[]
}

export interface questionTags
{
  questionTagId?: number,
  questionId?: number,
  tagId: number,
  createdDate?: Date,
  modifiedDate?: Date,
}
