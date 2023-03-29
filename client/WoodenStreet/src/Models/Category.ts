export interface Category{
  categoryId? : number
  furnitureItemId : string,
  categoryName : string,
  imageUrl : string,
  createdDate? : Date,
  modifiedDate? : Date
}

export interface CategoryCustom{
  categoryId? : number
  furnitureItemName : string,
  categoryName : string,
  imageUrl : string,
  createdDate? : Date,
  modifiedDate? : Date
}
