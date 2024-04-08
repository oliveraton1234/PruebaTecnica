
const initialState = {
    user: null,
    loading: false,
    error: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'AUTH_LOGIN_BEGIN':
            return {
            ...state,
            loading: true,
            error: null
            };
        case 'AUTH_LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLoggedIn: true,
            };
        case 'LOGOUT':
            return {
            ...state,
            user: null,
            isLoggedIn: false,
            };
        case 'AUTH_LOGIN_FAILURE':
            return {
            ...state,
            loading: false,
            error: action.payload
            };
        default:
            return state;
    }
}

export default authReducer;