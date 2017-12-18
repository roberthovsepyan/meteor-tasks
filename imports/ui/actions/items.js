export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item
    }
};

export const moveItem = (item) => {
    return {
        type: 'MOVE_ITEM',
        payload: item
    }
};

export const deleteItem = (item) => {
    return {
        type: 'DELETE_ITEM',
        payload: item
    }
};

export const deleteItems = (cardId) => {
    return {
        type: 'DELETE_ITEMS',
        payload: cardId
    }
};