import { Fragment } from 'react';

import styles from './Preloader.module.scss';

type Status = 'start' | 'done';

interface PreloaderProps {
    status?: Status;
    backgroundColor?: string;
}

const Preloader = (props: PreloaderProps) => {
    const {
        status = 'start',
        backgroundColor,
    } = props;

    return (
        <Fragment>
            {status === 'start' && (
                <div className={styles.content} style={{ backgroundColor }}>
                    <div className={styles.preloader} />
                </div>
            )}
        </Fragment>
    )
}

export default Preloader;