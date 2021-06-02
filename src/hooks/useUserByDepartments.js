import {useState, useEffect} from 'react'
import {customFetch} from '../helpers/customFetch'
export const useUserByDepartment = (id) => {
    const [state, setState] = useState({
      loading: true,
      error: null,
      data: []  
    })

    useEffect(() => {
        if (id.length > 0) {
            customFetch(`/api/findByDepartment/${id}`, 'GET', false).then(({users}) => {
                setState({...state, loading: false, data: users})
            }).catch(e => {
                setState({...state, loading: false, error: e})
            }) 
        }
    }, [id])

    return [state]
}