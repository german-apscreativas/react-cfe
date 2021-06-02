import {useState, useEffect} from 'react'
import {customFetch} from '../helpers/customFetch'
export const useRoleByName = (word) => {
    const [state, setState] = useState({
      loading: true,
      error: null,
      data: []  
    })

    useEffect(() => {
        if (word.length > 0) {
            customFetch('/api/rol-filter', 'POST', false, {word}).then((resp) => {
                setState({...state, data: resp.roles})
            }).catch(e => {
                setState({...state, error: e})
            }) 
        }
    }, [word])

    return [state]
}