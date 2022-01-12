import React from 'react';
import { useSelector } from 'react-redux';
import Cart from '../Cart';
import CartLinks from '../CartLinks';
import CartMoreOptions from '../CartMoreOptions';
import CartTemplate from '../CartTemplate';
import ClientProfileData from '../ClientProfileData';
import PaymentData from '../PaymentData';
import ShippingData from '../ShippingData';
import Totalizers from '../Totalizers';
import Preloader from '../Preloader';
import Header from '../Header';
import Footer from '../Footer';
import { loading$ } from '../../redux/UI/selectors';

import styles from './Layout.module.scss';

function Layout() {
    const loading = useSelector(loading$);

    return (
        <div className={styles.layout}>
            <main>
                {loading && <Preloader backgroundColor='rgba(255, 255, 255, 0.3)' />}
                <Header />
                <Cart />
                <CartMoreOptions />
                <CartLinks />
                <Totalizers />
                <ClientProfileData />
                <ShippingData />
                <PaymentData />
                <CartTemplate />
                <Footer />
            </main>
        </div>
    )
}

export default Layout;