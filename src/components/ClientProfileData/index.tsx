import { Fragment, useEffect } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import { renderComponent, setStyle } from '../../helpers';
import { setLoading } from '../../redux/UI/action';
import { hash$ } from '../../redux/UI/selectors';
import ClientForm, { ClientFormData } from './ClientForm';
import { ASSETS } from '../../environment';

import './styles.scss';

declare let vtexjs: any;

const ClientProfileData = () => {
    /** Here you can implement the overwrite for the cart section */

    const dispatch = useDispatch();
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

    useEffect(() => {
        // Waiting for css transition
        setTimeout(() => {
            if (hash !== 'cart') {
                const cancelEditionProfileBtnExists = document.querySelector('#cancel-edition-profile');
                const editable = hash === 'profile';
                renderForm(editable);

                if (cancelEditionProfileBtnExists) {
                    if (editable) {
                        // Show button
                        cancelEditionProfileBtnExists.classList.remove('hidden');
                    } else {
                        // Hide button
                        cancelEditionProfileBtnExists.classList.add('hidden');
                    }
                }
            }
        }, 500);
    }, [hash]);

    const updateUI = () => {
        const accordionToggle = document.querySelector('#client-profile-data .accordion-toggle') as HTMLElement;
        const iconEdit = accordionToggle?.querySelector('.icon-edit') as HTMLElement;
        const iconUser = accordionToggle?.querySelector('.icon-user') as HTMLElement;

        if (myInterval && iconEdit?.style?.backgroundImage && iconUser?.style?.backgroundImage) {
            clearInterval(myInterval);
            dispatch(setLoading(false));
        }

        const commonPropsImg = {
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        };
        setStyle(iconUser, {
            ...commonPropsImg,
            backgroundImage: `url('${ASSETS}/images/user.svg')`,
        });
        setStyle(iconEdit, {
            ...commonPropsImg,
            backgroundImage: `url('${ASSETS}/images/edit.svg')`,
        });

        // Append new button for cancel edition
        const cancelEditionProfileBtn = document.createElement('BUTTON');
        const tooltipCancel = document.createElement('DIV');
        cancelEditionProfileBtn.id = 'cancel-edition-profile';
        cancelEditionProfileBtn.classList.add('hidden');

        ReactDOM.render(
            <Tooltip title="Cancelar" placement="top">
                <img src={`${ASSETS}/images/error.svg`} alt="x" />
            </Tooltip>,
            tooltipCancel
        );
        cancelEditionProfileBtn.append(tooltipCancel);
        cancelEditionProfileBtn.onclick = () => {
            // Hidden the button once it was clicked
            const thisButton = document.getElementById('cancel-edition-profile');
            thisButton.classList.add('hidden');
            handleContinue();
        }
        const cancelEditionProfileBtnExists = accordionToggle?.querySelector('#cancel-edition-profile');
        if (accordionToggle && !cancelEditionProfileBtnExists) {
            accordionToggle.appendChild(cancelEditionProfileBtn);
        }
    }

    const handleSubmit = async (formData: ClientFormData) => {
        if (!window['vtexjs'] || !formData) return;

        const orderForm = await vtexjs.checkout.getOrderForm();
        vtexjs.checkout.sendAttachment('clientProfileData', { ...orderForm.clientProfileData, ...formData });

        setTimeout(() => {
            window.location.href = '/checkout/#/shipping';
        }, 500);
    }

    const handleContinue = () => {
        window.history.back();
    }

    const renderForm = async (editable: boolean) => {
        if (!window['vtexjs']) return;

        const orderForm = await vtexjs.checkout.getOrderForm();
        const accordionInner = document.querySelector('#client-profile-data .accordion-group .accordion-body .accordion-inner');

        renderComponent(<ClientForm
            editable={editable}
            clientProfileData={orderForm?.clientProfileData}
            onSubmit={handleSubmit.bind(this)}
            onContinue={handleContinue.bind(this)} />,
            accordionInner);
    }

    return <Fragment />
}

export default ClientProfileData;