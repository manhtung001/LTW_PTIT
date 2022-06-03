package web.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class product {
	@Id
//	@NotNull
//	@NotEmpty(message = "Product's code cannot be empty.")
//    @NotBlank(message = "Product's code cannot be null")
	public String productCode;
	
//	@NotNull
//	@NotEmpty(message = "Product's description cannot be empty.")
//    @NotBlank(message = "Product's description cannot be null")
	public String productDescription;
	
//	@NotNull(message = "productPrice cannot be null.")
//    @Min(0)
	public String productPrice;
	
	
	public product() {
		// TODO Auto-generated constructor stub
	}
	
	public product(String productCode, String productDescription, String productPrice) {
		this.productCode = productCode;
		this.productDescription = productDescription;
		this.productPrice = productPrice;
	}
	public String getProductCode() {
		return productCode;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public String getProductPrice() {
		return productPrice;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	public void setProductPrice(String productPrice) {
		this.productPrice = productPrice;
	}
	
	
}

//productCode VARCHAR(10) NOT NULL DEFAULT '',
//productDescription VARCHAR(100) NOT NULL DEFAULT '',
//productPrice DECIMAL(7,2) NOT NULL DEFAULT '0.00',