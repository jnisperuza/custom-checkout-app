import React, { Fragment } from 'react';
import Cart from '../Cart';
import CartLinks from '../CartLinks';
import CartMoreOptions from '../CartMoreOptions';
import CartTemplate from '../CartTemplate';
import ClientProfileData from '../ClientProfileData';
import PaymentData from '../PaymentData';
import ShippingData from '../ShippingData';
import Totalizers from '../Totalizers';

/**
 * 
 * @returns Returns all the components that will be responsible for customizing the VTEX Checkout
 * @description It is responsible for unifying all the components, If you need to validate component 
 * loading according to the path with the following function: getHash() from helper file.
 */

const App = () => (
    <Fragment>
        <Cart />
        <CartMoreOptions />
        <CartLinks />
        <Totalizers />
        <ClientProfileData />
        <ShippingData />
        <PaymentData />
        <CartTemplate />
    </Fragment>
)

export default App;