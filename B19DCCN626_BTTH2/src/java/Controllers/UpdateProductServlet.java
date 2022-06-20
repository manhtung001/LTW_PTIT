package Controllers;

import Business.Product;
import Business.ProductDB;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class UpdateProductServlet extends HttpServlet {
 
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String code = request.getParameter("Code");
        String description = request.getParameter("Description");
        double price = Double.parseDouble(request.getParameter("Price"));
        
        HttpSession session = request.getSession();
        String message = "";
        
        message = (String)session.getAttribute("message");
        String url = "";
        
        if ((code.isEmpty()) || (description.isEmpty() || (price==0))){
            message = "You must enter in all information";
            session.setAttribute("message", message);
            url = "/Product.jsp";
        }else{
            if(ProductDB.productExists(code)){
                Product p1 = new Product();
                p1.setCode(code);
                p1.setDescription(description);
                p1.setPrice(price);
                try {
                    ProductDB.update(p1);
                } catch (SQLException ex) {
                    System.out.println(ex);
                }
                url="/DisplayProductsServlet";
            }else{
                Product p2 = new Product();
                p2.setCode(code);
                p2.setDescription(description);
                p2.setPrice(price);
                ProductDB.insert(p2);
                url="/DisplayProductsServlet";
            }
        }
       RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
            dispatcher.forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }


}
