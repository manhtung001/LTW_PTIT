import React from 'react'
import Banner from '../../components/Banner'
import Sevice from '../../components/News'
import ProductNew from '../../components/Products-new'
import ProductSale from '../../components/Products-sale'
import ProductCommingSoon from '../../components/Products-commingsoon'
import ProductAll from '../../components/Products-all'
import Promo from '../../components/Promo'
import Sale from '../../components/Sale'

const HomePage = () => {
    return (
        <div>
            <Banner />
            {/* <Sevice /> */}
            <ProductSale />
            <ProductCommingSoon />
            {/* <Sale /> */}
            <ProductNew />
            <ProductAll />
            <Promo />
        </div>
    )
}

export default HomePage
