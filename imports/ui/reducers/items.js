export default function (state=[], action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload];
        case 'MOVE_ITEM':
        {let newState = [...state];
            newState.forEach((item) => {
                if (item.cardId===action.payload.cardId && item.id===action.payload.id) {
                    item.state = action.payload.state;
                }
            });
            return newState;
        }
        case 'DELETE_ITEM':
        {let newState = [...state];
            newState.forEach((item) => {
                if (action.payload===item.id) {
                    newState.splice(newState.indexOf(item), 1);
                }
            });
            return newState;
        }
        case 'DELETE_ITEMS':
        {let newState = [...state];
            newState.forEach((item) => {
                if (action.payload===item.cardId) {
                    newState.splice(newState.indexOf(item), 1);
                }
            });
            return newState;
        }
        default:
            return state;
    }
};