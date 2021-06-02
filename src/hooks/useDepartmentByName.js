import {useState, useEffect} from 'react'
import {customFetch} from '../helpers/customFetch'
export const useDepartmentByName = (word) => {
    const [state, setState] = useState({
      loading: true,
      error: null,
      data: []  
    })

    useEffect(() => {
        if (word.length > 0) {
            customFetch('/api/department-filter', 'POST', false, {word}).then((resp) => {
                setState({...state, data: resp.departments})
            }).catch(e => {
                setState({...state, error: e})
            }) 
        }
    }, [word])

    return [state]
}