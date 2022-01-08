import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Title.module.scss';

const Title = (props: any) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle className={styles.content} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className={styles.closeBtn}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default Title;