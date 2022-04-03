import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'


const Item = (value, onDetailProduct) => {
    let money = Number(value.price);
    money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })
    return (
        // co 1 api tra ve thong tin 1 san pham
        <Link onClick={() => onDetailProduct(value._id)} to={`/products/${value.slug}`} className="product__item__title">
        <div className="col-xl-3 col-sm-6 col-md-4 product__items">
            <div className="product__content">
                <div className="product__content__img">
                    <img className="img--before" src={value.productImage[0].img} alt="" />
                    <img className="img--after" src={value.productImage[1].img} alt="" />
                </div>
                <div className="product__img--title">Giảm {value.sale}%</div>
            </div>
            <Link className="product__item__title">
            {value.title}
            </Link>
            <p className="product__item__price">{money}</p>
        </div>
        </Link>
    )
}

export default Item;
