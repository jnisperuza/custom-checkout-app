import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import StyledSnackbar, { SnackbarOptions } from '../StyledSnackbars';
import store from '../../redux/store';
import theme from '../../theme';
import Layout from '../Layout';

/**
 * 
 * @returns Returns all the components that will be responsible for customizing the VTEX Checkout
 * @description It is responsible for unifying all the components, If you need to validate component 
 * loading according to the path with the following function: getHash() from helper file.
 */

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                preventDuplicate
                hideIconVariant
                maxSnack={3}
                content={(key: SnackbarKey, props: SnackbarOptions) => (
                    <StyledSnackbar id={key} message={props.message} type={props.type} />
                )}>
                <Layout />
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>
);

export default App;