const initialState = {
    devices: [],
}

import { ADDED_DEVICE, DEVICES_FETCHED } from './actions';

export default (state = initialState, action) => {

    const { device, devices,  type } = action;

    switch (type) {
        case ADDED_DEVICE:
            return { ...state, devices: [...state.devices, device]}
        case DEVICES_FETCHED:
            return { ...state, devices}
        default: return state;
    }
}

