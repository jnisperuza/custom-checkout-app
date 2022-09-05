import { useState } from "react";
import StyledDialog from "../StyledDialog";

import styles from './SampleDialog.module.scss';


function SampleDialog() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="sampleDialog">
            <button
                type='button'
                className={styles.trigger}
                onClick={() => setOpen(true)} />

            <StyledDialog
                className="sampleDialog"
                title="Modal title"
                open={open}
                onClose={() => setOpen(false)}>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            </StyledDialog>
        </div>
    )
}

export default SampleDialog;