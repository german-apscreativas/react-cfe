import { type } from "../type"

// **  Initial State
const initialState = {
    tickets: [],
    ticketSelected: {},
    historyTicketSelected: [],
    loading: false,
    nextToken: null,
    hasMore: true 
  }
  
  const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
     case type.selectTicket:
       return {...state, ticketSelected: action.payload}
     case type.cleanTicket:
       return {...state, ticketSelected: {}}
     case type.getTickets:
       return { ...state, tickets: action.payload, loading: false} 
      case type.newTicket:
        return { ...state, tickets: [...state.tickets, action.payload], loading: false }
      case type.updateTicket:
        return { ...state, tickets: state.tickets.map((item) => (item.id === action.payload.id ? action.payload : item)) }
      case type.resetTicket:
        return {tickets: [], ticketSelected: {}, historyTicketSelected: []}
      case type.getHistory:
        return {...state, historyTicketSelected: action.payload}
      case type.pageHistoryTicket: 
        return {...state, nextToken: action.payload.nextToken, hasMore: action.payload.hasMore }
      case type.pageHistoryTicketAdd: 
        return {...state, historyTicketSelected: [...action.payload, ...state.historyTicketSelected]}
      case type.createHistory:
        return {...state, historyTicketSelected: [...state.historyTicketSelected, action.payload], loading: false}
      case type.changeTicketUser:
        return {...state, historyTicketSelected: [], tickets: state.tickets.filter((item) => item.id !== action.payload)}
      case '[TICKET] LOADING': 
        return {...state, loading: action.payload}  
      default:
        return state
    }
  }
  
  export default ticketsReducer
  