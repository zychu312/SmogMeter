export const CELL_CHOSEN = 'CELL_CHOSEN';

export const onCellChosen = id => ({
    type: CELL_CHOSEN,
    value: id
});


import { provideToken } from '../Authorization/actions';


export const onSaveHall = hall =>
    new Promise((resolve, reject) => {
        const headers = new Headers({
            'Authorization': `Bearer ${provideToken()}`,
            'Content-Type': 'application/json'
        });

        fetch('/hall', { method: 'post', body: JSON.stringify(hall), headers })
            .then(res => {
                if (!res.ok) throw new Error(`Bad response: ${res.status}`);
            })
            .then(data => resolve())
            .catch(err => reject(err));
    });

export const getHall = domain =>
    new Promise((resolve, reject) => {

        const headers = new Headers({ 'Authorization': `Bearer ${provideToken()}` });

        fetch(`/halls/${domain}`, { headers })
            .then(res => {
                if (res.ok) return res.json();
                else throw new Error(`Bad response: ${res.status}`);
            })
            .then(data => {
                if (data != null) resolve(data);
                else reject('isNull');
            })
            .catch(err => reject(err));
    });
