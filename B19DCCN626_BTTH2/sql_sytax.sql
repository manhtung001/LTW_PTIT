DROP DATABASE IF EXISTS musicDB;

CREATE DATABASE musicDB;

USE musicDB;

  
CREATE TABLE Product(
    ProductID INT NOT NULL AUTO_INCREMENT,
    ProductCode VARCHAR(10) NOT NULL DEFAULT '',
    ProductDescription VARCHAR(100) NOT NULL DEFAULT '',
    ProductPrice DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  
    PRIMARY KEY (ProductID)
);
  
INSERT INTO Product VALUES 
  ('1', '8601', '86 (the band) - True Life Songs and Pictures', '14.95'),
  ('2', 'pf01', 'Paddlefoot - The first CD', '12.95'),
  ('3', 'pf02', 'Paddlefoot - The second CD', '14.95'),
  ('4', 'jr01', 'Joe Rut - Genuine Wood Grained Finish', '14.95');
  


DELIMITER //
CREATE PROCEDURE drop_user_if_exists()
BEGIN
    DECLARE userCount BIGINT DEFAULT 0 ;

    SELECT COUNT(*) INTO userCount FROM mysql.user
    WHERE User = 'khongtung' and  Host = 'localhost';

    IF userCount > 0 THEN
        DROP USER khongtung@localhost;
    END IF;
END ; //
DELIMITER ;

CALL drop_user_if_exists() ;

CREATE USER khongtung@localhost IDENTIFIED BY 'khongtungpass';

GRANT SELECT, INSERT, UPDATE, DELETE
ON musicDB.*
TO khongtung@localhost;