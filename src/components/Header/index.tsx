import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { renderComponent } from '../../helpers';
import { setHash } from '../../redux/UI/action';
import SampleLogo from '../SampleLogo';

import './styles.scss';

const Header = () => {
    /** Here you can implement the overwrite for the cart section */
    
    const dispatch = useDispatch();

    useEffect(() => {
        decideAction();
        /** TODO: Here you need to remove this sample logo */
        renderSampleLogo();
    }, []);

    window.onhashchange = () => {
        decideAction();
    }

    const decideAction = () => {
        const hash = window.location.hash?.replace('#/', '');
        const path = window.location.pathname;

        if (hash) {
            dispatch(setHash(hash));

            switch (hash) {
                case 'cart':
                case 'payment':
                case 'profile':
                case 'shipping':
                    console.info("With this hash you could dispatch some redux actions: ", hash);
                    break;
                case 'email':
                    console.warn("Unauthenticated, make a decision.");
                    break;
                default:
                    break;
            }
        } else {
            // checkout/orderPlaced/?og=XXXXX
            dispatch(setHash(path));
        }
    }

    /** TODO: Here you need to remove this sample logo */
    const renderSampleLogo = () => {
        const homePageLink = document.querySelector('[title="Go to homepage"]');
        renderComponent(<SampleLogo />, homePageLink);
    }

    return <Fragment />
}

export default Header;