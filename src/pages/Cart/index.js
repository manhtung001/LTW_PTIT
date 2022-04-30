import { DeleteFilled } from '@ant-design/icons'
import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateQuantityCart } from '../../action'
import { cartTotal, addItemToCart } from '../../action/cart'
import cartApi from '../../api/cartApi'
import './style.css'

const Cart = () => {
    const [cartProduct, setCart] = useState({
        cart: [],
        totalPrice: 0
    })
    const [number, setNumber] = useState(false)
    const dispatch = useDispatch()
    const useSelect = useSelector(state => state.user.list)
    const cartList = useSelector(state => state.cart.cartProductList)

    // const orderProduct = useSelector(state => state.order.orderAction)
    const cartRefresh = useSelector(state => state.cart.checkCart)

    useEffect(() => {
        let totalPriceTmp = 0
        cartList.forEach(element => {
            totalPriceTmp += element.product.price * element.quantity
        });
        setCart({
            cart: cartList,
            totalPrice: totalPriceTmp
        })
     }, [])

    const onDelete = (product_id, product_size, quantity) => {

        let cartListTmp = []

        let priceItemDelete = 0

        cartProduct.cart.forEach(item => {
                if(item.product._id == product_id && item.size == product_size) {
                    message.success("Xóa sản phẩm thành công !")
                    priceItemDelete = item.product.price
                } else {
                    cartListTmp.push(item)
                }
            }
        )
        setCart({
            ...cartProduct,
            cart: cartListTmp,
            totalPrice: cartProduct.totalPrice - priceItemDelete * quantity
        })
        const action = addItemToCart(cartListTmp)
        dispatch(action)
    }

    const onMinus = (product_id, product_size) => {

        let cartListTmp = cartProduct.cart

        cartListTmp.map(item => {
            if(item.product._id == product_id && item.size == product_size) {
                
                if(item.quantity > 1 ){
                    item.quantity -= 1
                    message.success("Giảm sản phẩm thành công")
                    setCart({
                        ...cartProduct,
                        cart: cartListTmp,
                        totalPrice: cartProduct.totalPrice - item.product.price
                    })
                    const action = addItemToCart(cartListTmp)
                    dispatch(action)
                } else {
                    message.warning("Sản phẩm tối thiểu là 1")
                }
            }
         })
    }

    const onPlus = (product_id, product_size) => {

        let cartListTmp = cartProduct.cart

        cartListTmp.map(item => {
            if(item.product._id == product_id && item.size == product_size) {
                
                if(item.quantity < 10){
                    item.quantity += 1
                    message.success("Tăng sản phẩm thành công")
                    setCart({
                        ...cartProduct,
                        cart: cartListTmp,
                        totalPrice: cartProduct.totalPrice + item.product.price
                    })
                    const action = addItemToCart(cartListTmp)
                    dispatch(action)
                } else {
                    message.warning("Sản phẩm tối đa là 10")
                }
            }
         })
    }

    const showCart = (cartProduct) => {

        let result = null
        result = cartProduct.map((value, index) => {
            console.log("showCart")
            console.log(value)
            let item = value.product
            let money = Number(item.price * value.quantity);
            money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            return (
                <div key={index} className="cart__list">
                    <div className="cart__item">
                        <div className="row pr">
                            <div className="col-xl-3 cart__img ">
                                <img src={item.productImage[0].img} alt="" />
                            </div>
                            <div className="col-xl-9 mr">
                                <div className="row pr">
                                    <div className="col-xl-6 cart__icon--start">
                                        <Link className="name--product" to="/">{item.title}</Link>
                                        <p>Size: {value.size}</p>
                                    </div>
                                    <div className="col-xl-6 cart__icon--end">
                                        <div className="cart__quantity">
                                            <button type="button" onClick={() => onMinus(item._id, value.size)} className={!number ? "cart__minus" :"cart__minus disable"} disabled={number}>-</button>
                                            <span>{value.quantity}</span>
                                            <button onClick={() => onPlus(item._id, value.size)} className={!number ? "cart__plus" :"cart__plus disable"} disabled={number}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pr">
                                    <div className="col-xl-6 cart__icon--start">
                                        <div onClick={() => onDelete(item._id, value.size, value.quantity)} className="cart__remove">
                                            <DeleteFilled />
                                            <span>Xóa</span>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="cart__price cart__icon--end">
                                            <span>{money}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return result
    }

    const onBuyCart = (totalCart) => {
        const action = cartTotal(totalCart)
        dispatch(action)
    }
    return (
        <div className="cart">
            <div className="container">
                {
                    !useSelect || cartProduct.result === 0 || cartRefresh === false ?
                        <div className="empty">
                            <div className="empty__content">
                                <h2 className="empty__title">Không có đơn hàng nào</h2>
                                <Link to="/" className="empty__button">
                                    <button className="shopping">Tiếp tục mua sắm</button>
                                </Link>
                            </div>
                        </div>
                        :
                        <div className="row cart__top">
                            <div className="col-xl-8 col-lg-8 mr">
                                <div className="cart__content">
                                    <h2 className="cart__title">Giỏ Hàng ( {cartProduct.cart.length} sản phẩm )</h2>
                                    {showCart(cartProduct.cart)}

                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 mr cart__sum">
                                <div className="cart__total">
                                    <h2 className="cart__total--title">Cộng giỏ hàng</h2>
                                    <div className="cart__amuont">
                                        <span className="cart__amount--title">Tạm tính</span>
                                        <span className="cart__amount--price">{cartProduct.totalPrice}</span>
                                    </div>
                                    <div className="cart__amuont">
                                        <span className="cart__amount--title">Phí ship</span>
                                        <span className="cart__amount--price">30.000 đ</span>
                                    </div>
                                    <div onClick={() => onBuyCart(cartProduct)} className="cart__button">
                                        <Link to="/thanh-toan">Thanh Toán Hàng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                   }
            </div>
        </div>
    )
}

export default Cart
