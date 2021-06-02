// ** Handle User Login
import {type} from '../type'
import { client } from '../../helpers/AppSyncClient'
import { listTicketsHistoryTest} from '../../graphql/queries'
import {customFetch} from '../../helpers/customFetch'
import Swal from 'sweetalert2'
export const getTickets = () => {
  return async (dispatch, getState) => {
    dispatch({type: '[TICKET] LOADING', payload: true})
    const {ticket:{tickets}} = getState()
    if (tickets.length === 0) {
      const request = await customFetch('/tickets/all?page=1', 'GET', false)
      let infoCharged = []
      if (request.data) {
          console.log(request.data)
          infoCharged = [...request.data]
      }
      dispatch({type: type.getTickets, payload: infoCharged })
    } else {
      dispatch({type: '[TICKET] LOADING', payload: false})
    }

    // ** Add to user to localStorage
    // localStorage.setItem('userData', JSON.stringify(data))
  }
}
export const filterTickets = (data) => {
  return async (dispatch, getState) => {
    let filter = ''
    for (const key in data) {
      if (data[key] && data[key].length > 0) {
        filter += `${key}=${data[key]}&`
      }
    }
    filter = filter.slice(0, filter.length - 1)
    const request = await customFetch(`/tickets/all?${filter}`, 'GET', false)
    let infoCharged = []
    if (request.data) {
        console.log(request.data)
        infoCharged = [...request.data]
    }
    dispatch({type: type.getTickets, payload: infoCharged })

    // ** Add to user to localStorage
    // localStorage.setItem('userData', JSON.stringify(data))
  }
}


// ** Handle User Logout
export const createTicket = (data) => {
  return async dispatch => {

    dispatch({type: '[TICKET] LOADING', payload: true})
    const clientid = JSON.parse(localStorage.getItem('userData')).id

    const request = await customFetch('/tickets/create', 'POST', false, {...data, clientid})
    
    if (request.data) {
      Swal.fire({
        icon: "success",
        text: 'Se ha registrado el ticket correctamente'
      })
      const obj = {...request.data}      
      dispatch({type: type.newTicket, payload: obj})
    } else {

      dispatch({type: '[TICKET] LOADING', payload: false})
      Swal.fire({
        icon: "error",
        text: 'Error al guardar el ticket'
      })
    }
  }
}
export const ticketHistory = () => {
  return async (dispatch, getState) => {
    try {
      
      let hasMore = true
      const {ticket:{ticketSelected}} = getState()
      const resp = await client.graphql({
        query: listTicketsHistoryTest,
        variables: {
          count: 10,
          ticketid: ticketSelected.id,
          orderBy:  "DESC"
        }
      })
      if (!resp.data.listTicketsHistoryTest.nextToken) hasMore = false
      
      // const request = await customFetch(`/history_tickets/${ticketSelected.id}`, 'GET', false)
      dispatch({type: type.getHistory, payload: resp.data.listTicketsHistoryTest.items})
      dispatch({type: type.pageHistoryTicket, payload: {nextToken: resp.data.listTicketsHistoryTest.nextToken, hasMore}})
    } catch (e) {
      console.log(e)
    }
  }
}

export const ticketHistoryPage = () => {
  return async (dispatch, getState) => {
    try {
      let hasMore = true
      const {ticket:{ticketSelected, nextToken}} = getState()
      const resp = await client.graphql({
        query: listTicketsHistoryTest,
        variables: {
          count: 5,
          ticketid: ticketSelected.id,
          nextToken
        }
      })
      if (!resp.data.listTicketsHistoryTest.nextToken) hasMore = false
      // const request = await customFetch(`/history_tickets/${ticketSelected.id}`, 'GET', false)
      dispatch({type: type.pageHistoryTicketAdd, payload: resp.data.listTicketsHistoryTest.items })
    
      dispatch({type: type.pageHistoryTicket, payload: {nextToken: resp.data.listTicketsHistoryTest.nextToken, hasMore} })
    } catch (e) {
      console.log(e)
    }
  }
}

export const createTicketHistory = (message, img) => {
  return async (dispatch, getState) => {
    dispatch({type: '[TICKET] LOADING', payload: true})
    const {ticket:{ticketSelected}, auth:{userData}} = getState()
    const title = `Mensaje de ${userData.fullname}`
    const userSendId = userData.roles_name === 'CUSTOMER' ? ticketSelected.useractiveid : ticketSelected.clientid
    const request = await customFetch(`/history_tickets/create`, 'POST', false, {message, img, ticketid: ticketSelected.id, title, userSendId})
    if (request.data) {
      Swal.fire({
        icon: "success",
        text: "Mensaje creado correctamente"
      })
      dispatch({type: type.createHistory, payload: request.data})
    } else {
      dispatch({type: '[TICKET] LOADING', payload: false})
    }
  }
}

export const updateStatusTicket = (status, history) => {
  return async (dispatch, getState) => {
    const {ticket: {ticketSelected}} = getState()
    const request = await customFetch(`/tickets/${ticketSelected.id}`, 'PUT', false, {status})
    if (request) {
      const obj = {...ticketSelected, status}
      history.push("/dashboard/client")
      dispatch({type: type.updateTicket, payload: obj })
    }
  }
}

export const changeUserTicket = (data, history) => {
  return async (dispatch, getState) => {
    const {ticket: {ticketSelected}} = getState()
    const request = await customFetch(`/tickets/${ticketSelected.id}`, 'PUT', false, {...data})
    if (request) {
      history.push('/dashboard/tickets')
      dispatch({type: type.changeTicketUser, payload: ticketSelected.id})
    }
  }
}

