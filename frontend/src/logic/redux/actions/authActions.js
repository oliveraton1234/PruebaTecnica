
import axios from 'axios';

export const loginUser = (credentials, navigate) => {
    return (dispatch) => {
        dispatch({ type: 'AUTH_LOGIN_BEGIN' });
        axios.post('http://localhost:3000/api/auth/login', credentials)
            .then(response => {
                dispatch({ type: 'AUTH_LOGIN_SUCCESS', payload: response.data });                
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/dashboard');
            })
            .catch(error => {
                dispatch({ type: 'AUTH_LOGIN_FAILURE', payload: error.response.data });
            });
    };
};
