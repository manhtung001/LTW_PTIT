import { HeartOutlined, ReloadOutlined, SearchOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductData } from '../../action'
import productApi from '../../api/productApi'
import './style.css'


const onDetailProduct = (id, dispatch, product) => {
    let result = null
    product.forEach((value) => {
        if (id === value._id) {
            result = value
        }
    })
    const action = ProductData(result)
    dispatch(action)
}

const showProduct = (products, dispatch) => {
    let result = null
    result = products.map((value, index) => {
        let money = Number(value.price);
        money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })

        return (
            <Link onClick={() => onDetailProduct(value._id, dispatch, products)} to={`/products/${value.slug}`} key={index} className="col-xl-3 col-sm-6 col-md-4 product__items">
                <div className="product__content">
                    <div className="product__content__img">
                        <img className="img--before" src={value.productImage[0].img} alt="" />
                        <img className="img--after" src={value.productImage[1].img} alt="" />
                    </div>
                    <div className="product__img--title">Giảm {value.sale}%</div>
                </div>
                <Link onClick={() => onDetailProduct(value._id, dispatch, products)} to={`/products/${value.slug}`} className="product__item__title">{value.title}</Link>
                <p className="product__item__price">{money}</p>
            </Link>
        )
    })
    return result
}

export default showProduct