import { LOADING, SET_HASH } from './actionTypes';

export const setLoading = (loading: boolean) => ({
    type: LOADING,
    payload: { loading }
});

export const setHash = (hash: string) => ({
    type: SET_HASH,
    payload: { hash }
});