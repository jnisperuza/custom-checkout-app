import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setHash } from '../../redux/UI/action';

import './styles.scss';

const Header = () => {
    /** Here you can implement the overwrite for the cart section */
    const dispatch = useDispatch();

    window.onhashchange = () => {
        const hash = window.location.hash?.replace('#/', '');
        if (!hash) return;
        dispatch(setHash(hash));
    }

    return <Fragment />
}

export default Header;