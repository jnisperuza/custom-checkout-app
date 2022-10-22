import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import Alert from '@mui/material/Alert';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import store from '../../redux/store';
import theme from '../../theme';

interface ProviderContextProps {
    children: ReactNode;
}

type Type = 'success' | 'error' | 'warning' | 'info';
type Variant = 'filled' | 'outlined' | 'standard';

interface SnackbarOptions {
    message: string;
    variant?: Variant;
    type?: Type;
}

function ProviderContext(props: ProviderContextProps) {
    const {
        children
    } = props;

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    preventDuplicate
                    hideIconVariant
                    maxSnack={3}
                    content={(key: SnackbarKey, props: SnackbarOptions) => (
                        <Alert severity={props.type}>
                            {props.message}
                        </Alert>
                    )}>
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default ProviderContext;