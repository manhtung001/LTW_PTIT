const initalCart = {
    cartProduct:false,
    cartTotal: JSON.parse(localStorage.getItem("cart")) || null,
    checkCart: JSON.parse(localStorage.getItem("check")),
    cartProductList: []
}

const cartReducer = (state = initalCart, action) => {
    switch(action.type){
        case "ADDITEMTOCART":{
            let cartProductListTmp = state.cartProductList
            console.log("ADDITEMTOCART")
            console.log(cartProductListTmp)
            console.log(action.payload)
            return {
                ...state,
                cartProductList: action.payload
            }
        }
        case "QUATITY":{
            let quantityProduct = state.cartProduct
            return{
                ...state,
                cartProduct: !quantityProduct
            }
        }
        case "CHECK":{
            let checkProduct = state.cartProduct
            checkProduct = action.payload
            localStorage.setItem("check", JSON.stringify(checkProduct))
            return{
                ...state,
                checkCart: checkProduct
            }
        }
        case "TOTALCART":{
            let newTotal = state.cartTotal
            
            if(action.payload === null){
                newTotal = null
            }
            newTotal = action.payload
            localStorage.setItem("cart" ,JSON.stringify(newTotal))
            return{
                ...state,
                cartTotal: newTotal
            }
        }    
        default:
            return state
    }   
}

export default cartReducer
