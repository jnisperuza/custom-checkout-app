import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { renderComponent } from '../../helpers';
import { hash$ } from '../../redux/UI/selectors';
import SampleDialog from '../SampleDialog';
import SampleToast from '../SampleToast';

import './styles.scss';

const CartMoreOptions = () => {
    /** Here you can implement the overwrite for the cart section */

    const hash = useSelector(hash$);

    let myInterval = null;

    useEffect(() => {
        if (hash) {
            myInterval = setInterval(updateUI, 1000);
        }
        () => {
            myInterval && clearInterval(myInterval);
        }
    }, [hash]);

    const updateUI = () => {
        if (hash === 'cart') {
            addSampleContainers();
            renderSampleToast();
            renderSampleDialog();
        }
    }

    const addSampleContainers = () => {
        const srpData = document.querySelector('.cart-more-options #shipping-preview-container .srp-content .srp-data');
        const sampleToastContainer = srpData?.querySelector('.sample-toast-container');
        const sampleDialogContainer = srpData?.querySelector('.sample-dialog-container');

        if (srpData && !sampleToastContainer) {
            srpData.insertAdjacentHTML(
                "beforeend",
                `<div class="sample-toast-container"></div>`
            );
        }

        if (srpData && !sampleDialogContainer) {
            srpData.insertAdjacentHTML(
                "beforeend",
                `<div class="sample-dialog-container"></div>`
            );
        }
    }

    const renderSampleToast = () => {
        const sampleToastContainer = document.querySelector('.cart-more-options .sample-toast-container');
        renderComponent(<SampleToast />, sampleToastContainer);
    }

    const renderSampleDialog = () => {
        const sampleDialogContainer = document.querySelector('.cart-more-options .sample-dialog-container');
        renderComponent(<SampleDialog />, sampleDialogContainer);
    }

    return <Fragment />
}

export default CartMoreOptions;