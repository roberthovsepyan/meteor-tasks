export default function (state={expanded: false}, action) {
    switch (action.type) {
        case 'EXPAND':
            return {...state, expanded: action.payload};
        case 'AUTH_CHECK':
            return {...state, isAuth: action.payload};
        default:
            return state;
    }
};