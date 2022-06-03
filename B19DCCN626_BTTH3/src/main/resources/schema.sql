CREATE table if not exists Product(
    productCode VARCHAR(10) NOT NULL DEFAULT '',
    productDescription VARCHAR(100) NOT NULL DEFAULT '',
    productPrice VARCHAR(100) NOT NULL DEFAULT '0.00',
  
    PRIMARY KEY (productCode)
);