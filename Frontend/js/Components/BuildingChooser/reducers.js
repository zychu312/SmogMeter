const initialState = {
    chosen: null // 1
}

import { BUILDING_CHOSEN } from './actions';

export default (state = initialState, action) => {

    const { value, type } = action;

    switch (type) {
        case BUILDING_CHOSEN:
            return { ...state, chosen: value }
        default: return state;
    }
}