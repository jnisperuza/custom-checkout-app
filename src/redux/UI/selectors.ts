import { State } from "../reducer";

export const loading$ = (state: State) => state.UI.loading;
export const hash$ = (state: State) => state.UI.hash;