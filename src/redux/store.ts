import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})