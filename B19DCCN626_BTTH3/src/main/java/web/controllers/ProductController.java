package web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;


import org.springframework.web.bind.annotation.PathVariable;

import web.models.product;
import web.repositories.productRepository;

@Controller
@RequestMapping(path = "product")
public class ProductController {
	@Autowired 											
	private productRepository ProductRepository;
	//http:localhost:8080/product/editProduct/8601
	@RequestMapping(value = "/editProduct/{ProductCode}", method = RequestMethod.GET)
	public String editProduct(Model model, @PathVariable String ProductCode) {
		Optional<product> productFinded = ProductRepository.findById(ProductCode);
	    model.addAttribute("productFinded", productFinded.get());
	    return "displayUpdateProduct";
	}
	
	public static boolean isNumeric(String str) { 
		  try {  
		    Double.parseDouble(str);  
		    return true;
		  } catch(NumberFormatException e){  
		    return false;  
		  }  
	}
	
	@RequestMapping(value = "/updateProduct", method = RequestMethod.POST)
	public String updateProduct(Model model,
			product Product
			) {
		
		String messageErrorEmpty = "";
		System.out.println("updateProduct");
		System.out.println(Product.getProductCode());
		System.out.println(Product.getProductDescription());
		System.out.println(Product.getProductPrice());
		
		if(Product.getProductCode().trim().isEmpty()) {
			messageErrorEmpty += "ProductCode not emty, ";
        } 
		
		if(Product.getProductDescription().trim().isEmpty()) {
			messageErrorEmpty += "ProductDescription not emty, ";
        } 
		
		if(Product.getProductPrice().trim().isEmpty()) {
			messageErrorEmpty += "ProductPrice not emty, ";
        } else {
    		if(!isNumeric(Product.getProductPrice())) {
    			messageErrorEmpty += "ProductPrice must be is number, ";
            } else {
            	 Double tmpNum = Double.parseDouble(Product.getProductPrice());
            	 if(tmpNum <= 0) {
            		 messageErrorEmpty += "ProductPrice must more than 0";
            	 }
            }
        }

		if(!messageErrorEmpty.equalsIgnoreCase("")) {
			 product productFinded = ProductRepository.findById(Product.getProductCode()).get();
			 model.addAttribute("productFinded", productFinded);
	         model.addAttribute("messageErrorEmpty", messageErrorEmpty);
	         return "displayUpdateProduct";
        } else {
        	ProductRepository.save(Product);
    	    return "redirect:/displayProducts";
        }
	}
	
	@RequestMapping(value = "/addProductPage", method = RequestMethod.GET)
	public String returnPageAddProduct(Model model) {
		model.addAttribute("product", new product());
	    return "displayAddProduct";
	}
	
	@RequestMapping(value = "/addProduct", method = RequestMethod.POST)
	public String addProduct(Model model,
			product Product
			) {

		
		String messageErrorEmpty = "";
		System.out.println("addProduct");
		System.out.println(Product.getProductCode());
		System.out.println(Product.getProductDescription());
		System.out.println(Product.getProductPrice());

		if(Product.getProductCode().trim().isEmpty()) {
			messageErrorEmpty += "ProductCode not emty, ";
        } 
		
		if(Product.getProductDescription().trim().isEmpty()) {
			messageErrorEmpty += "ProductDescription not emty, ";
        } 
		
		if(Product.getProductPrice().trim().isEmpty()) {
			messageErrorEmpty += "ProductPrice not emty, ";
        } else {
    		if(!isNumeric(Product.getProductPrice())) {
    			messageErrorEmpty += "ProductPrice must be is number, ";
            } else {
            	 Double tmpNum = Double.parseDouble(Product.getProductPrice());
            	 if(tmpNum <= 0) {
            		 messageErrorEmpty += "ProductPrice must more than 0";
            	 }
            }
        }
		
//		if(Product.getProductPrice() <= 0) {
//			messageErrorEmpty += "ProductPrice more than 0 ";
//        }
		if(!messageErrorEmpty.equalsIgnoreCase("")) {
	         model.addAttribute("messageErrorEmpty", messageErrorEmpty);
	         return "displayAddProduct";
        } else {
        	ProductRepository.save(Product);
    	    return "redirect:/displayProducts";
        }
	}
	
	
	@RequestMapping(value = "/deleteProductPage/{ProductCode}", method = RequestMethod.GET)
	public String returnPageDeleteProduct(Model model, @PathVariable String ProductCode) {
		Optional<product> productFinded = ProductRepository.findById(ProductCode);
	    model.addAttribute("productFinded", productFinded.get());
	    return "displayDeleteProduct";
	}
	
	@RequestMapping(value = "/deleteProduct", method = RequestMethod.POST)
	public String deleteProduct(Model model, product Product) {
		ProductRepository.deleteById(Product.productCode);
	    return "redirect:/displayProducts";
	}
}

