const HallGenerator = (width, height) => {

    const nonActiv = [0,1,2,27,
        28,54,20,21,22,23,24,25,26,27,47,
        48,49,50,51,52,53,74,75,76,77,78,79,80];

    const getColorUponId = id => {
        if(nonActiv.indexOf(id) > -1) return 'grey';
        return '#F5F5F5';
    }
    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return () => Array.from({ length: width * height },
        (el, index) => ({
            id: index,
            x: index % width, y: Math.floor(index / width),
            color: getColorUponId(index),
            isActive: nonActiv.indexOf(index) <= -1
        })
    );
}

const generateHall = HallGenerator(27, 15);

const initialState = {
    chosen: 0,
    cells: {
        '1': generateHall()
    },
    draggedSize: {width: 1, height: 1},
    isAddRoutesActive : false,
    isRemoveRoutesActive: false
}

import { CELL_CHOSEN } from './actions';

export default (state = initialState, action) => {

    const { value, type } = action;

    switch (type) {
        case CELL_CHOSEN:
            return { ...state, chosen: value }
        case 'DEVICE_DRAGGED':
            return {...state, draggedSize: action.size}
        case 'TOGGLE_ADD_ROUTES':
            if(state.isAddRoutesActive) {
                return {...state, isAddRoutesActive: false}
            } else {
                const newState0 = {...state, isAddRoutesActive: true}
                return {...newState0, isRemoveRoutesActive: false}
            }
            case 'TOGGLE_REMOVE_ROUTES':
            if(state.isRemoveRoutesActive) {
                return {...state, isRemoveRoutesActive: false}
            } else {
                const newState0 = {...state, isAddRoutesActive: false}
                return {...newState0, isRemoveRoutesActive: true}
            }             
        default: return state;
    }
}