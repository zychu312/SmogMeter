const initialState = {
    level: 0,
    maxLevel: 5,
    minLevel: 0,
    lastPhysicalLevel: 4,
    captions: {
        5: 'Zawory'
    }
}

import { ON_LEVEL_UP, ON_LEVEL_DOWN } from './actions'

export default (state = initialState, action) => {

    const { type } = action;

    const { level, maxLevel, minLevel } = state;

    switch (type) {
        
        case ON_LEVEL_UP:
            return level < maxLevel ?
             { ...state, level: state.level + 1 } : state;

        case ON_LEVEL_DOWN:
            return level > minLevel ? { ...state, level: state.level - 1 } : state;
        default: return state;
    }
}

