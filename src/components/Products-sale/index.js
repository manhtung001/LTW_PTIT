import React, { useEffect, useState } from 'react'
import './style.css'
import productApi from '../../api/productApi'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingCartOutlined, SearchOutlined, ReloadOutlined, HeartOutlined, StarFilled } from '@ant-design/icons'
import { ProductData } from '../../action'
import {useDispatch} from 'react-redux'
import LoadingProduct from '../Loading/lodingProduct'
import showProduct from '../Item'

const ProductSale = () => {
    const [product, setProduct] = useState([])
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setLoad(true)
        async function renderProduct() {
            try {
                const res = await productApi.getProduct()
                setLoad(false)
                setProduct(res.saleProducts)
            } catch (err) {
                setLoad(false)
                console.log(err);
            }
        }
        renderProduct()
    }, [])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          }
        ]
    };
    return (
        <div className="product__sale">
            <div className="container">
                <div className="product__sale__header">
                    <div className="product__heading">
                        <h1 className="product__sale--title">Sản phẩm sale</h1>
                    </div>
                </div>
                <div className="product__sale__content">
                    <Slider autoplay {...settings}>
                        {load ? <LoadingProduct /> : showProduct(product, dispatch, false)}
                    </Slider>
                </div>
            </div>
        </div >
    )
}

export default ProductSale
