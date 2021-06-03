export const createMedidor = (Mdata) => {
    return async dispatch => {
        
        dispatch({ type: '[MEDIDOR] LOADING', payload: true })
        const clientId = JSON.parse(localStorage.getItem('userData')).id

        
    }
}