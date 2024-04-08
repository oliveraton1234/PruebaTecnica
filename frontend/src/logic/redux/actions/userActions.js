
import axios from 'axios';

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USERS_BEGIN' });
        const tokenString = localStorage.getItem('user');
        const tokenObj = JSON.parse(tokenString);
        const config = {
            headers: {
                'Authorization': `Bearer ${tokenObj.accessToken}` 
            }
        };
        axios.get('http://localhost:3000/api/users/all', config)    
            .then(response => {
                dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_USERS_FAILURE', payload: error });
                console.log(error);
            });
    };
};


export const deleteUser = (userId) => {
    return (dispatch) => {
        const tokenString = localStorage.getItem('user');
        const tokenObj = JSON.parse(tokenString);
        const config = {
            headers: {
                'Authorization': `Bearer ${tokenObj.accessToken}` 
            }
        };
        axios.delete(`http://localhost:3000/api/users/delete/id/${userId}`, config)
            .then(() => {
                dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
                dispatch(fetchUsers());
            })
            .catch(error => {
                dispatch({ type: 'DELETE_USER_FAILURE', payload: error });
            });
    };
};


export const editUser = (userId, userData) => {
    return (dispatch) => {
        const tokenString = localStorage.getItem('user');
        const tokenObj = JSON.parse(tokenString);
        const config = {
            headers: {
                'Authorization': `Bearer ${tokenObj.accessToken}` 
            }
        };
        console.log(`http://localhost:3000/api/users/edit/${userId}`, userData, config)
        axios.put(`http://localhost:3000/api/users/edit/${userId}`, userData, config)
            .then(response => {
                dispatch({ type: 'EDIT_USER_SUCCESS', payload: response.data });
                dispatch(fetchUsers());
            })
            .catch(error => {
                dispatch({ type: 'EDIT_USER_FAILURE', payload: error });
            });
    };
};

export const createUser = (userData) => {
    return (dispatch) => {
        const tokenString = localStorage.getItem('user');
        const tokenObj = JSON.parse(tokenString);
        const config = {
            headers: {
                'Authorization': `Bearer ${tokenObj.accessToken}` 
            }
        };
        axios.post('http://localhost:3000/api/users', userData, config)
            .then(response => {
                dispatch({ type: 'CREATE_USER_SUCCESS', payload: response.data });
                // Opcional: Refrescar la lista de usuarios después de crear uno nuevo
                
                dispatch(fetchUsers());
            })
            .catch(error => {
                dispatch({ type: 'CREATE_USER_FAILURE', payload: error });
            });
    };
};