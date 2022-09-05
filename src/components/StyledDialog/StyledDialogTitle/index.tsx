import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import './styles.scss';

const StyledDialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle className="styledDialogTitle" {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className="styledDialogTitle__closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default StyledDialogTitle;