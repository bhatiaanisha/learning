export interface Question{
    questionId?: number,
    questionTitle: string,
    questionBody: string,
    userId: number,
    createdDate?: Date,
    modifiedDate?: Date
}
