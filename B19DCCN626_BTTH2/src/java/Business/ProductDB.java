package Business;

import java.sql.*;
import java.util.*;
import Business.Product;

public class ProductDB
{
    public static Product selectProduct(String productCode)
    {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        String query = "SELECT * FROM Product " +
                "WHERE ProductCode = ?";
        try
        {
            ps = connection.prepareStatement(query);
            ps.setString(1, productCode);
            System.out.println("init selectProduct");
            System.out.println(ps);
            rs = ps.executeQuery();
            
            if (rs.next())
            {
                Product p = new Product();
                p.setCode(rs.getString("ProductCode"));
                System.out.println("selectProduct");
                System.out.println(rs.getString("ProductCode"));
                p.setDescription(rs.getString("ProductDescription"));
                p.setPrice(rs.getDouble("ProductPrice"));
                return p;
            }
            else
            {
                System.out.println("no selectProduct");
                return null;
            }
        }
        catch(SQLException e)
        {
            e.printStackTrace();
            return null;
        }
        finally
        {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }
    
    public static ArrayList<Product> selectProducts()
    {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        String query = "SELECT * FROM Product";
        try
        {
            ps = connection.prepareStatement(query);
            rs = ps.executeQuery();
            ArrayList<Product> products = new ArrayList<Product>();
            while (rs.next())
            {
                Product p = new Product();
                p.setCode(rs.getString("ProductCode"));
                p.setDescription(rs.getString("ProductDescription"));
                p.setPrice(rs.getDouble("ProductPrice"));
                products.add(p);
            }
            return products;
        }
        catch(SQLException e)
        {
            e.printStackTrace();
            return null;
        }
        finally
        {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }
    
   public static int update(Product product) throws SQLException{
        
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        
        String query = "UPDATE Product SET " 
               + " ProductCode = ?, "
               + " ProductDescription = ?, "
               + " ProductPrice = ?"
               + "WHERE ProductCode = ?";
        
        try{
            ps = connection.prepareStatement(query);
            ps.setString(1, product.getCode());
            ps.setString(2, product.getDescription());
            ps.setDouble(3, product.getPrice());
            ps.setString(4, product.getCode());
            
            return ps.executeUpdate();
            
        }catch(SQLException e){
            e.printStackTrace();
            return 0;
        }finally{
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
            
        }
    }
   
   public static int delete(Product product) {
       
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        
        
        String query = "DELETE FROM PRODUCT " +
            "WHERE ProductCode = ?";
        try{
        ps = connection.prepareStatement(query);
        ps.setString(1, product.getCode());
        
        return ps.executeUpdate();
        
        }catch(SQLException e){
            e.printStackTrace();
            return 0;
        }finally{
            
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
       
   }
   
   public static int insert(Product product){
       
       ConnectionPool pool = ConnectionPool.getInstance();
       Connection connection = pool.getConnection();
       PreparedStatement ps = null;
       
       String query = "INSERT INTO PRODUCT (ProductCode, ProductDescription, ProductPrice) " +
               "VALUES (?, ?, ?)";
       try{
           
           ps = connection.prepareStatement(query);
           ps.setString(1, product.getCode());
           ps.setString(2, product.getDescription());
           ps.setDouble(3, product.getPrice());
           return ps.executeUpdate();
       }catch (SQLException e){
           e.printStackTrace();
           return 0;
       }finally{
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
       }
   }
   
   public static boolean productExists(String productCode)
    {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        String query = "SELECT ProductCode FROM Product " +
                "WHERE ProductCode = ?";
        try
        {
            ps = connection.prepareStatement(query);
            ps.setString(1, productCode);
            rs = ps.executeQuery();
            return rs.next();
        }
        catch(SQLException e)
        {
            e.printStackTrace();
            return false;
        }
        finally
        {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }
    
} 