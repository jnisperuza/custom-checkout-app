import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Title from './Title';

import styles from './StyledDialog.module.scss';

export interface StyledDialogProps {
    open: boolean;
    title?: string | ReactNode;
    children: ReactNode;
    className?: string;
    width?: string | number;
    height?: string | number;
    onClose?: (event: Event, reason: string) => void;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: 300,
        minHeight: 150,
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StyledDialog = (props: StyledDialogProps) => {
    const {
        open,
        title,
        children,
        className,
        width,
        height,
        onClose,
    } = props;

    return (
        <div className={styles.content}>
            <CustomDialog
                aria-labelledby="styled-dialog"
                open={open}
                onClose={onClose}
                className={className}
                PaperProps={{ sx: { width, height, maxWidth: width } }}
            >
                <Title id="customized-dialog-title" onClose={onClose}>
                    {title}
                </Title>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </CustomDialog>
        </div>
    )
}

export default StyledDialog;