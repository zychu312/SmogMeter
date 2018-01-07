const initialState = {
    token: null
};

import { TOKEN_FETCHED } from './actions';

export default (state = initialState, action) => {
    
    const { type, token } = action;

    switch (type) {
        case TOKEN_FETCHED:
            return { ...state, token };
        default: return state;
    }
};

