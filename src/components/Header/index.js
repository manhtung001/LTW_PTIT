import {
    CaretDownFilled, CloseCircleOutlined,
    CloseOutlined, DownOutlined, MenuOutlined, SearchOutlined,
    ShoppingCartOutlined, ShoppingOutlined
} from '@ant-design/icons'
import { faPhone, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchItem, userSignOut } from '../../action'
import { checkCart } from '../../action/cart'
import cartApi from '../../api/cartApi'
import ModalSearch from './ModalSearch/modalSearch'
import './style.css'

const Header = () => {
    const [cart, setCart] = useState()
    const [menu, setMenu] = useState("menu__mobile__content")
    const [sub, setSub] = useState(-1)
    const [searchValue, setSearchValue] = useState({
        initialValue: ''
    })
    const [checkSub, setCheckSub] = useState()

    const useSelect = useSelector(state => state.user.list)
    const checkSearchProduct = useSelector(state => state.product.searchProduct)
    

    const quantityProduct = useSelector(state => state.cart.cartProduct)
    const check = useSelector(state => state.cart.checkCart)
    const dispatch = useDispatch()

    useEffect(() => {
        async function renderCart() {
            try {
                const res = await cartApi.getCart()
                setCart(res.result)
            }
            catch (err) {
                // console.log(err);
            }
        }
        renderCart()
    }, [quantityProduct, useSelect])


    const onMenu = (setMenu) => {
        setMenu("menu__mobile__content active")
    }
    const onMenuCancel = (setMenu) => {
        setMenu("menu__mobile__content")
    }

    const onSeacrch = () => {
       
        const action = searchItem(!checkSearchProduct)
        dispatch(action)
    }
    const onChangeSearch = (e) =>{
        const {value} = e.target
        setSearchValue({
            ...searchValue,
            initialValue: value
        })
    }

    const onSignOut = (item) => {
        const action = userSignOut(item)
        dispatch(action)
        const actionCheck = checkCart(false)
        dispatch(actionCheck)
    }
    return (
        <div className="header">
            <div className="header__top">
                <div className="container">
                    <div className="top">
                        <div className="header__top__phone">
                            <MenuOutlined onClick={() => onMenu(setMenu)} className="menu--outline" />
                            <p className="header__phone--item"><FontAwesomeIcon icon={faPhone} /> +09 675 88888</p>
                        </div>
                        <div className="header__top__right">
                            {useSelect === null ? "" :
                                <div className="header__bils">
                                    <ShoppingOutlined />
                                    <Link to="/lich-su-don-hang">Đơn Đặt Hàng</Link>
                                </div>}

                            <FontAwesomeIcon icon={faUser} />
                            {useSelect === null ? <Link to="/login" className="header__login">Đăng nhập /</Link> : <span> {useSelect.name} /</span>}
                            {useSelect === null ?
                                <Link to="/sign-up" className="header__signup">Đăng kí</Link> :
                                <Link onClick={() => onSignOut(useSelect)} to="/" className="header__signout"> Đăng xuất</Link>
                            }
                            <Link to="/gio-hang" className="header__top_product"><FontAwesomeIcon icon={faShoppingCart} /> {!useSelect || check === false ? "0" : cart} Sản phẩm</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header__mid">
                <div className="container">
                    <nav className="nav">
                        <div className="header__mid__left">
                            <Link className="header__logo" to="/">
                                <span>T</span>
                                <span>{"&"}</span>
                                <span>T</span>
                                <span>S</span>
                                <span>H</span>
                                <span>O</span>
                                <span>P</span>
                            </Link>

                        </div>
                        <div className="header__mid__right">
                            <ul className="header__menu">
                            </ul>
                            <div className="search__product">
                                <SearchOutlined className="icon--search" onClick={() => onSeacrch()} />
                                <div className={ checkSearchProduct ? "modal__search active" : "modal__search"}>
                                    <div className="search__heading">
                                        <h2>Tìm Kiếm Sản Phẩm</h2>
                                        <CloseOutlined className="cancle__search" onClick={onSeacrch} />
                                    </div>
                                    <div className="search__content">
                                        <SearchOutlined />
                                        <input type="text" value={searchValue.initialValue} placeholder="Tìm Kiếm Sản Phẩm" onChange={onChangeSearch} />
                                    </div>
                                    <ModalSearch valueSearch={searchValue.initialValue}/>
                                </div>
                            </div>
                            <div className="menu__mobile">
                                <div className={menu}>
                                    <div className="menu__cancel">
                                        <CloseCircleOutlined onClick={() => onMenuCancel(setMenu)} />
                                    </div>
                                    <div className="menu__mobile__header">
                                        {useSelect === null ? <Link onClick={() => onMenuCancel(setMenu)} to="/login" className="header__login">Đăng nhập /</Link> : <span>{useSelect.name} /</span>}
                                        {useSelect === null ?
                                            <Link onClick={() => onMenuCancel(setMenu)} to="/sign-up" className="header__signup">Đăng kí</Link> :
                                            <Link onClick={() => onSignOut(useSelect)} to="/" className="header__signout"> Đăng xuất</Link>
                                        }
                                    </div>
                                    {useSelect === null ? "" :
                                        <div className="header__service">
                                            <div className="header__cart__menu">
                                                <ShoppingCartOutlined />
                                                <Link onClick={() => onMenuCancel(setMenu)} to="/gio-hang">Giỏ Hàng ({!useSelect || check === false ? "0" : cart})</Link>
                                            </div>
                                            <div className="header__bils__menu">
                                                <ShoppingOutlined />
                                                <Link onClick={() => onMenuCancel(setMenu)} to="/lich-su-don-hang">Đơn Đặt Hàng</Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    )
}

export default Header
