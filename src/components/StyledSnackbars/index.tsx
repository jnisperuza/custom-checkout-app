import { forwardRef, RefObject } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackbarKey, useSnackbar } from 'notistack';

import styles from './StyledSnackbar.module.scss';

export type Type = 'success' | 'error' | 'warning' | 'info';
export type Variant = 'filled' | 'outlined' | 'standard';


export interface SnackbarOptions {
    message: string;
    variant?: Variant;
    type?: Type;
}

export interface StyledSnackbarProps {
    id?: SnackbarKey;
    type?: Type;
    variant?: Variant;
    message?: string;
}

function StyledSnackbar(
    props: StyledSnackbarProps,
    ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined
) {
    const { closeSnackbar } = useSnackbar();
    const {
        id,
        type,
        variant = 'filled',
        message,
    } = props;

    const handleClose = () => {
        closeSnackbar(id);
    }

    const Alert = forwardRef(
        function Alert(
            props: AlertProps,
            ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined
        ) {
            return <MuiAlert elevation={6} ref={ref} variant={variant} {...props} />;
        });

    return (
        <div className={styles.content} ref={ref}>
            {type && (
                <Alert className={styles.alert} onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            )}
            {!type && (
                <span>{message}</span>
            )}
        </div>
    )
}

export default forwardRef(StyledSnackbar);