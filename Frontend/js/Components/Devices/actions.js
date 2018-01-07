export const DEVICES_FETCHED = 'DEVICES_FETCHED';
export const ADDED_DEVICE = 'ADDED_DEVICE';

import { provideToken } from '../Authorization/actions';

export const getDevices = () => dispatch => {

    const headers = new Headers({
        'Authorization': `Bearer ${provideToken()}`,
        'Content-Type': 'application/json'
    });

    fetch('/devices', { headers })
        .then(res => {
            if (res.ok) return res.json();
            else throw new Error(`Bad response: ${res.status}`);
        })
        .then(devices => onSuccess(devices, dispatch))
        .catch(err => console.log(err));

    const onSuccess = (devices, dispatch) => dispatch({ type: DEVICES_FETCHED, devices });
};


export const onDeviceAdd = device => dispatch =>
    new Promise((resolve, reject) => {

        const headers = new Headers({
            'Authorization': `Bearer ${provideToken()}`,
            'Content-Type': 'application/json'
        });

        fetch('/device', { method: 'post', body: JSON.stringify(device), headers })
            .then(res => {
                if (res.ok) return res.json();
                else throw new Error(`Bad response: ${res.status}`);
            })
            .then(data => {
                resolve();
                onSuccess(device, dispatch);
            })
            .catch(err => reject(err));

        const onSuccess = (device, dispatch) => dispatch({ type: ADDED_DEVICE, device });
    });



