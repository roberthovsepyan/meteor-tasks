export const handleExpand = (exp) => {
    return {
        type: 'EXPAND',
        payload: exp
    }
};

export const authorizationCheck = (str) => {
    return {
        type: 'AUTH_CHECK',
        payload: str
    }
};
