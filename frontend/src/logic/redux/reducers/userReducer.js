
const initialState = {
    userList: [],
    loading: false,
    error: null,
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                userList: action.payload, 
            };        
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                userList: state.userList.filter(user => user.id !== action.payload),
            };
        case 'EDIT_USER_SUCCESS':
            return {
                ...state,
                userList: state.userList.map(user => user.id === action.payload.id ? action.payload : user),
            };

        default:
            return state;
    }
}

export default userReducer;
