import { HeartOutlined, ReloadOutlined, SearchOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductData, searchItem } from '../../../action'
import productApi from '../../../api/productApi'
import LodingProduct from '../../Loading/lodingProduct' 
import showProduct from '../../Item'

const ModalSearch = (props) => {
    const valueSearch = props.valueSearch
    const [loadWeb, setLoadWeb] = useState(false)
    const [productSeach, setProductSearch] = useState([])
    const dispatch = useDispatch()

    useEffect(() =>{
        setLoadWeb(true)
        async function getProductSearch(){
            try{
                const res = await productApi.getProductSearch(valueSearch)
                console.log("getProductSearch func")
                console.log(res)
                setLoadWeb(false)
                setProductSearch(res.products)
            }
            catch(err){
                setLoadWeb(false)
                // console.log(err);
            }
        }
        getProductSearch()
    },[valueSearch])
    

    return (
        <div className="container">
            <div className="row">
                {
                    loadWeb === false ? showProduct(productSeach, dispatch, true) : <LodingProduct />
                }
            </div>
        </div>
    )
}

export default ModalSearch
