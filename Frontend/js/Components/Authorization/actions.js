const headers = new Headers({ 'Content-Type': 'application/json' });

export const TOKEN_FETCHED = 'TOKEN_FETCHED';

export default user => dispatch => {
    fetch('/users/login', { method: 'post', body: JSON.stringify(user), headers })
        .then(res => {
            if (res.ok) return res.json();
            else throw new Error(`Bad response: ${res.status}`);
        })
        .then(({ token }) => {
            onSuccess(token);
        });

    const onSuccess = token => {
        dispatch({ type: TOKEN_FETCHED, token });
        localStorage.setItem('token', token);
    };
};

export const provideToken = () => localStorage.getItem('token');


