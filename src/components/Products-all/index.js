import { HeartOutlined, ReloadOutlined, SearchOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductData } from '../../action'
import productApi from '../../api/productApi'
import './style.css'

import showProduct from '../Item'


const ProductAll = () => {
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        async function renderProduct() {
            try {
                const res = await productApi.getProduct()
                setProduct(res.newProducts)
            } catch (err) {
                console.log(err);
            }
        }
        renderProduct()
    }, [])


    return (
        <div className="product__new">
            <div className="container">
                <div className="product__new__heading">
                    <h1 className="product__new--title">Tất cả sản phẩm</h1>
                </div>
                <div className="row">
                    {showProduct(product, dispatch)}
                </div>
            </div>
        </div>
    )
}

export default ProductAll;
