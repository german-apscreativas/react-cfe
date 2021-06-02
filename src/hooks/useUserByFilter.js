import { useEffect, useState } from "react"
import { customFetch } from "../helpers/customFetch"

export const useUserByFilter = (word) => {
    const [state, setState] = useState({
        data: [],
        error: null
    })

    useEffect(() => {
        customFetch('/api/user-filter', 'POST', false, {word}).then((resp) => {
            setState({...state, data: resp.users})
        }).catch(e => {
            setState({...state, error: e})
        }) 
    }, [word])

    return [state]
}