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


public class DisplayProdServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        String message = "";
        session.setAttribute("message", message);
        
        if(request.getParameter("productCode") == null){
            
            Product product = new Product();
            
            session.setAttribute("product", product);
            
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/Product.jsp");
            dispatcher.forward(request, response);
        }else{
            Product product = ProductDB.selectProduct(request.getParameter("productCode") );
            session.setAttribute("product", product);
            
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/Product.jsp");
            dispatcher.forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
