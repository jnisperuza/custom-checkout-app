import { LOADING } from './actionTypes';

export const setLoading = (loading: boolean) => ({
    type: LOADING,
    payload: { loading }
});