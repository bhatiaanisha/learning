export interface ProductDTO{
  productId? : number,
  productName : string,
  companyName : string,
  isRated : boolean,
  ratings : number,
  originalPrice : number,
  discountedPrice : number,
  productImageUrl : string
}

export interface ProductDetailDTO{
  productId? : number,
  productName : string,
  ratings : number,
  reviews : number,
  originalPrice : number,
  discountedPrice : number,
  seater? : string,
  material? : string,
  color? : string,
  dimensionsInInch? : string,
  mechanism? : string
  dimensionsInCm? : string,
  foam? : string,
  weightCapacity? : string,
  width? : string,
  warranty? : string,
  shipsIn? : string,
  deliveryCondition? : string,
  sku? : string,
  productImageUrl? : string
}
