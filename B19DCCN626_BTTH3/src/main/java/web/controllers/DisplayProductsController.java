package web.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;

import web.models.product;
import web.repositories.productRepository;


@Controller
@RequestMapping(path = "displayProducts")
//http:localhost:8080/displayProducts
public class DisplayProductsController {
	@Autowired 															
	private productRepository ProductRepository;
	//http:localhost:8080/displayProducts
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String getAllProducts(Model model) {
	    Iterable<product> listproduct = ProductRepository.findAll();
	    model.addAttribute("listproduct", listproduct);
	    return "displayProducts";
	}
}
