import { HeartOutlined, MenuOutlined, ReloadOutlined, SearchOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import { Pagination, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductData } from '../../action'
import productApi from '../../api/productApi'
import LoadingProduct from '../../components/Loading/lodingProduct'
import './style.css'
import showProduct from '../../components/Item'

// understand backing 
// in stock compete 
// => udemy

const ShowAllAndFilter = (props) => {
    // let nameURL = props.match.match.params.name
    const dispatch = useDispatch()
    const [slug, setSlug] = useState()
    const [totalProduct, setTotalProduct] = useState([])
    const [totalProductRender, setTotalProductRender] = useState([])
    const [err, setErr] = useState()
    const [saleSearch, setSaleSearch] = useState({
        saleFirst: (0).toLocaleString('vi', { style: 'currency', currency: 'VND' }),
        saleLast: (10000000).toLocaleString('vi', { style: 'currency', currency: 'VND' })
    })
    const [loadWeb, setLoadWeb] = useState(false)
    const [filter, setfilter] = useState({
        slug: '',
        sort: '',
        min: 0,
        max: 10000000,
    })

    const [pageNum, setpageNum] = useState(1)

    useEffect(() => {
        setLoadWeb(true)
        window.scrollTo(0, 0)
        async function renderProduct() {
            try {
                const res = await productApi.getProduct()
                setLoadWeb(false)
                let result = res.saleProducts.concat(res.newProducts)
                setTotalProduct(result)
                setTotalProductRender(result)
                setSlug(result.slice(0, 10))
            } catch (err) {
                setLoadWeb(false)
                console.log(err);
            }
        }
        renderProduct()
    }, [])
    useEffect(() => {
        setLoadWeb(true)
        window.scrollTo(0, 0)
        async function filterProduct() {
            try {
                console.log("filterProduct")
                console.log(filter)
                let resultFilter = []
                totalProduct.forEach((value) => {
                    if ( filter.min != '' && filter.max != '' && value.price >= filter.min && value.price <= filter.max) {
                        resultFilter.push(value)
                    }
                }) 
                setSlug(resultFilter.slice(0, 10))
                setTotalProductRender(resultFilter)
            } catch (err) {
                console.log(err);
            }
            setLoadWeb(false)
        }
       
        filterProduct()
    }, [filter])

    useEffect(() => {
        setLoadWeb(true)
        window.scrollTo(0, 0)
        async function filterProduct() {
            try {
                setSlug(totalProductRender.slice((pageNum-1) * 10, pageNum * 10))
            } catch (err) {
                console.log(err);
            }
            setLoadWeb(false)
        }
       
        filterProduct()
    }, [pageNum])

    const [flag, setFlag] = useState(true)

    const SortPrice = (e) => {
        const { value } = e.target
        setfilter({
            ...filter,
            sort: value
        })
    }

    const onChangeSale = (value) => {
        setSaleSearch({
            ...saleSearch,
            saleFirst: (value[0] * 100000).toLocaleString('vi', { style: 'currency', currency: 'VND' }),
            saleLast: (value[1] * 100000).toLocaleString('vi', { style: 'currency', currency: 'VND' })
        })
    }

    const onAfterChangeSale = (value) => {
        setfilter({
            ...filter,
            min: value[0] * 100000,
            max: value[1] * 100000
        })
    }

    const onDetailProduct = (id) => {
        let result = null
        if (slug) {
            slug.forEach((value) => {
                if (id === value._id) {
                    result = value
                }
            })
        }

        const action = ProductData(result)
        dispatch(action)
    }
    const showProductSlug = (products) => {
        let result = null
        if (products) {
            result = products.map((value, index) => {
                let money = Number(value.price);
                money = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })

                return (
                    <div key={index} className="col-sm-6 col-md-4 col-xl-3 product__items">
                        <div className="product__content">
                            <div className="product__content__img">
                                <img className="img--before" src={value.productImage[0].img} alt="" />
                                <img className="img--after" src={value.productImage[1].img} alt="" />
                            </div>
                            <div className="product__img--title">Giảm {value.sale}%</div>
                            <ul className="product__button">
                                <li className="product__button--list"><ShoppingCartOutlined /></li>
                                <Link onClick={() => onDetailProduct(value._id)} to={`/products/${value.slug}`} className="product__button--list">
                                    <SearchOutlined />
                                </Link>
                                <li className="product__button--list"><ReloadOutlined /></li>
                                <li className="product__button--list"><HeartOutlined /></li>
                            </ul>
                        </div>
                        <Link onClick={() => onDetailProduct(value._id)} to={`/products/${value.slug}`} className="product__item__title">{value.title}</Link>
                        <div className="product__item__rating">
                            <StarFilled className="rating--th1" />
                            <StarFilled className="rating--th2" />
                            <StarFilled className="rating--th3" />
                            <StarFilled className="rating--th4" />
                            <StarFilled className="rating--th5" />
                        </div>
                        <p className="product__item__price">{money}</p>
                    </div>
                )
            })
        }
        return result
    }
    const onMenu = (setFlag, flag) => {
        setFlag(!flag)
    }
    function onChangePage(pageNum) {
        setpageNum(pageNum)
    }


    // console.log("render")
    // console.log(slug)
    // console.log(totalProductRender)
    return (
        <div className="shop">

            <div className="container">
                <div className="shop__header">
                    <div className="filter">
                        <div className="filter__left">
                            <select onChange={(e) => SortPrice(e)}
                                className="filter__left__select">
                                <option value="sort">sắp xếp theo giá tiền</option>
                                <option value="sort=price">giá tiền từ thấp đến cao</option>
                                <option value="sort=-price">giá tiền từ cao đến thấp</option>
                            </select>
                        </div>
                        <div className="filter__right">
                            {slug ? <p>Hiển thị {slug.length} trên tổng số {totalProductRender.length} kết quả</p> : <p>không có kết quả</p>}
                            <div onClick={() => onMenu(setFlag, flag)} className="filter__search">
                                <span>tìm kiếm</span>
                                <MenuOutlined />
                            </div>
                        </div>
                    </div>
                    <div className={flag === true ? "sidebar--active" : "sidebar"}>
                        <div className="row">
                            <div className="col-xl-6 siba">
                                <div className="sidebar__item">
                                    <h2 className="sidebar__item--title">CHẤT LƯỢNG</h2>
                                    <ul className="sideber__checkbox">
                                        <li className="sideber__checkbox__item">
                                            <input type="checkbox" id="checkbox1" />
                                            <label>In stock</label>
                                        </li>
                                        <li className="sideber__checkbox__item">
                                            <input type="checkbox" id="checkbox2" />
                                            <label>Out stock</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-6 siba">
                                <div className="sidebar__item">
                                    <h2 className="sidebar__item--title">GIÁ TIỀN</h2>
                                    <p className="sidebar__item--decs">Sản phẩm trong khoảng: <span>{saleSearch.saleFirst} - {saleSearch.saleLast} </span></p>
                                    <Slider
                                        range
                                        step={1}
                                        defaultValue={[0, 100]}
                                        onChange={onChangeSale}
                                        onAfterChange={onAfterChangeSale}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {slug && !err ?
                    <div className="all__product">
                        <div className="row">
                            {loadWeb ? <LoadingProduct /> :
                                showProductSlug(slug)
                            }
                            {loadWeb ? <LoadingProduct /> : showProduct(slug, dispatch, false)}
                        </div>
                    </div>
                    :
                    <div className="shop__content">
                        <div className="shop__not-product">
                            <h3 className="not-product__title">Không Có Sản Phẩm Nào</h3>
                            <div className="shop__button">
                                <Link to="/"><button className="shopping">Tiếp tục mua sắm</button></Link>
                            </div>
                        </div>
                    </div>

                }
                <Pagination
                    defaultCurrent={1} 
                    total={totalProductRender.length} 
                    current={pageNum}
                     onChange={onChangePage}
                />
            </div>
        </div>
    )
}

export default ShowAllAndFilter
