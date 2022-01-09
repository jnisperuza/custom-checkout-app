import { Action } from "../reducer";
import { LOADING } from "./actionTypes";

export interface UIState {
    loading: boolean;
}

const initialState: UIState = {
    loading: false,
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
        default:
            return state;
    }
}