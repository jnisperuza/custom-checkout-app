import React from 'react';
import Layout from '../Layout';
import ProviderContext from '../../HOC/ProviderContext';

/**
 * 
 * @returns Returns all the components that will be responsible for customizing the VTEX Checkout
 * @description It is responsible for unifying all the components, If you need to validate component 
 * loading according to the path with the following function: getHash() from helper file.
 */

const App = () => (
    <ProviderContext>
        <Layout />
    </ProviderContext>
);

export default App;