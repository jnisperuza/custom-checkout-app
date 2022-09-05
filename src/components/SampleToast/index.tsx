import { useSnackbar } from 'notistack';

import styles from './SampleToast.module.scss';

/**
 * https://notistack.com/api-reference
 */
function SampleToast() {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar({
            message: 'This is a success alert',
            type: 'success'
        });
    }

    return (
        <button
            type='button'
            className={styles.sampleToast}
            onClick={handleClick} />
    )
}

export default SampleToast;