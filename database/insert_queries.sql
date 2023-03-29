--Inserting data into ObjectTypes table
INSERT INTO ObjectTypes(ObjectTypeName) VALUES ('UserType')
INSERT INTO ObjectTypes(ObjectTypeName) VALUES ('OrderStatusType')

--Inserting data into Objects table
INSERT INTO Objects(ObjectTypeId,ObjectValue) VALUES (1,'Admin'),
													 (1,'User'),
													 (2,'InProgress'),
													 (2,'Placed'),
													 (2,'Shipped'),
													 (2,'Delivered')

--Inserting data into FurnitureItems table
INSERT INTO FurnitureItems (FurnitureItemName) VALUES ('Sofas'),
													  ('Living'),
													  ('Bedroom'),
													  ('Dining & Kitchen'),
													  ('Storage'),
													  ('Study & Office'),
													  ('Kids Room'),
													  ('Mattresses'),
													  ('Decor'),
													  ('Lamps & Lighting'),
													  ('Furnishings'),
													  ('Outdoor'),
													  ('Sale')

--Inserting data into Category table
INSERT INTO Category (FurnitureItemId,CategoryName) VALUES (1,'Sofa Sets')

--Inserting data into SubCategory table
INSERT INTO SubCategory (CategoryId,SubCategoryName,ImageUrl) VALUES (1,'Fabric Sofas','../../assets/images/fabric_sofa.jpg'),
																	 (1,'Wooden Sofas','../../assets/images/wooden_sofa.jpg'),
																	 (1,'Sofa Cum Bed','../../assets/images/sofa_cumbed.jpg'),
																	 (1,'3 Seater Sofas','../../assets/images/3seater_sofa.jpg'),
																	 (1,'2 Seater Sofas','../../assets/images/2seater_sofa.jpg')

--Inserting data into Products table
INSERT INTO Products (SubCategoryId,ProductName,CompanyName,IsRated,Ratings,Reviews,OriginalPrice,DiscountedPrice) VALUES (1,'Henry 3 Seater Sofa (Velvet, Chestnut Brown)','By Wooden Street','true',677,196,94999,38989),
																														  (1,'Parker 3 Seater Sofa (Cotton, Cream Robins)','By Wooden Street','true',400,132,55999,33989),
																														  (1,'Arbor 3 Seater Sofa (Velvet, Dark Olive Green)','By Wooden Street','true',25,5,44999,29999),
																														  (1,'Berlin 3 Seater Sofa (Velvet, Indigo Blue)','By Wooden Street','true',556,130,57999,38989),
																														  (1,'Osbert 3 Seater Curved Sofa with Brass Cladding (Cotton, Jade Ivory)','By Wooden Street','true',60,10,62999,49989),
																														  (1,'Vanisa 3 Seater Living Room Sofa with 2 Arm Chairs and 6 Cushions','By Wooden Street','true',15,3,130199,87989)

--Inserting data into Images table
INSERT INTO Images (ProductId,ProductImageUrl) VALUES (1,'../../assets/images/fabric_sofa1.jpg'),
													  (2,'../../assets/images/fabric_sofa2.jpg'),
													  (3,'../../assets/images/fabric_sofa3.jpg'),
													  (4,'../../assets/images/fabric_sofa4.jpg'),
													  (5,'../../assets/images/fabric_sofa5.jpg'),
													  (6,'../../assets/images/fabric_sofa6.jpg')

--Inserting data into ProductOverview table
INSERT INTO ProductOverview (ProductId,Seater,Material,Color,DimensionsInInch,Mechanism,DimensionsInCm,Foam,WeightCapacity,Width,Warranty,ShipsIn,DeliveryCondition,SKU) VALUES (1,'3 seater','Velvet','Chestnut brown','78 L x 32 W x 30 H','','198.1 L x 81.3 W x 76.2 H','High Density Foam','','','36 Months Warranty','7 Days','Expert-Assembly','WSFBS070OG19767'),
																																												(2,'3 seater','Cotton','Cream robins','78 L x 33 W x 35 H','','198.1 L x 83.8 W x 88.9 H','','','','36 Months Warranty','23 Days','Expert-Assembly','WSFBS159BR22192'),
																																												(3,'3 seater','Velvet','Dark olive green','82 L x 30 W x 31 H','','208.3 L x 76.2 W x 78.7 H','High Density Foam','','','36 Months Warranty','23 Days','Expert-Assembly','WSFBS45753'),
																																												(4,'3 seater','Velvet','Indigo blue','72 L x 28.5 W x 30 H','','182.9 L x 72.4 W x 76.2 H','','','','36 Months Warranty','23 Days','Expert-Assembly','WSFBS159IB20205'),
																																												(5,'3 seater','Cotton','Jade ivory','','','238.8 L x 83.8 W x 76.2 H','High Density Foam','','','36 Months Warranty','23 Days','Expert-Assembly','WSFBS56'),
																																												(6,'','Cotton','Jade ivory','','','208.3 L x 80 W x 76.2 H','','','','36 Months Warranty','5-7 Weeks','Expert-Assembly','WSVANISA61609')
