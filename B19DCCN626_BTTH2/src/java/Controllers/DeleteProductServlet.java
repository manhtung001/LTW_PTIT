package Controllers;

import Business.Product;
import Business.ProductDB;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class DeleteProductServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String code = request.getParameter("productCode");
        String yes = request.getParameter("yesBtn");
        HttpSession session = request.getSession();
        
        Product product = ProductDB.selectProduct(code);
            session.setAttribute("product", product);
        String url = "";
        
        if (yes == null){
            url = "/confirmDelete.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
            dispatcher.forward(request, response);
                    
        } if("yes".equals(yes)){
            ProductDB.delete(product);
            url = "/DisplayProductsServlet";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
            dispatcher.forward(request, response);
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
