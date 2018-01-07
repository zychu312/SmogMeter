const initialState = {
    view: 0
}

export default (state = initialState, action) => {

    const { value, type } = action;

    switch (type) {
        case 'VIEW_CHANGED':
            return { ...state, view: value }
        default: return state;
    }
}