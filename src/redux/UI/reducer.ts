import { Action } from "../reducer";
import { LOADING, SET_HASH } from "./actionTypes";

export interface UIState {
    loading: boolean;
    hash: string;
}

const initialState: UIState = {
    loading: false,
    hash: null,
}

export default function reducer(state = initialState, action: Action) {
    switch (action.type) {
        case LOADING: {
            const { loading } = action.payload;
            return {
                ...state,
                loading
            }
        }
        case SET_HASH: {
            const { hash } = action.payload;
            return {
                ...state,
                hash
            }
        }
        default:
            return state;
    }
}