
import Swal from 'sweetalert2'

// const URL = 'https://wk281o55x0.execute-api.us-east-2.amazonaws.com/dev'
// const URL = 'https://mrm0q79yp4.execute-api.us-east-2.amazonaws.com/dev'
const URL = 'http://localhost:4000'

const headersConfig = async (isPublic) => {
    const headers = isPublic ? { 'Content-Type': 'application/json' } : {  'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }
    return headers
}

const configurationRequest = async (method, isPublic, body) => {
    let config = { method, headers: await headersConfig(isPublic) }
    if (method !== 'GET' && method !== 'DELETE') config = { ...config, body: JSON.stringify(body) }
    console.log("COFIG", config)
    return config
} 

const manageError = (error) => {
  const { message } = error
  if (message) return message
  else return 'Se registro un error en la acción, intentelo mas tarde'
}

export const customFetch = async (pUrl, pMethod = 'GET', isPublic = true, pBody = {}) => {
    try {
        console.log(pBody)
        const configuratedJson = await configurationRequest(pMethod, isPublic, pBody)
        const request = await fetch(`${URL}${pUrl}`, configuratedJson)
        const response = await request.json()
        console.log("Estamos en response de CumtomFetch", response)
        if (request.status !== 200) throw new Error(manageError(response))
        console.log("Response de customFetch", response)
        return response
    } catch (e) {
        const dataError = { message: e.message}
        Swal.fire({
            icon: 'error',
            text: e.message ? e.message : 'Error en la peticion'
        })
        throw JSON.stringify(dataError)
    }
}
