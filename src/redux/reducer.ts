import { combineReducers } from 'redux';
import reducerUI, { UIState } from './UI/reducer';

export interface State {
    UI: UIState;
}

export interface Action {
    type: string;
    payload: any;
}

const rootReducer = combineReducers({
    UI: reducerUI,
});

export default rootReducer;