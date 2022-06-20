package Business;

import java.io.Serializable;

public class Product implements Serializable
{
    private String code;
    private String description;
    private double price;
    
    public Product()
    {
        code = "";
        description = "";
        price = 0;
    }
    
    public void setCode(String code)
    {
        this.code = code;
    }
    
    public String getCode()
    {
        return code; 
    }
    
    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getDescription()
    {
        return description; 
    }
    
    public void setPrice(double price)
    {
        this.price = price;
    }

    public double getPrice()
    {
        return price; 
    }
}