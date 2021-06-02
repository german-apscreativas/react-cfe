import React, { useState, useEffect } from 'react'
import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import { Edit } from 'react-feather'
import { useHistory } from 'react-router'
import TicketModal from '../../../components/TicketModal'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets} from '../../../redux/actions/ticket'
import { type } from '../../../redux/type'
import {Loader} from '../../../components/Loader/Loader'
import {Redirect} from 'react-router-dom'
import { typeStatus } from '../../../helpers/TypeStatus'

const data = [
    {
        id:1,
        issue:"Se detecto un error en la pantalla de inicio"
    }
]

const Client = () => {
  const ticket = useSelector((state) => state.ticket.tickets)
  const loading = useSelector((state) => state.ticket.loading)
  const userData = useSelector((state) => state.auth.userData)

  if (userData.roles_name !== 'CUSTOMER') return <Redirect to="/dashboard/home" /> 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())
  }, [])
  const history = useHistory()  
  const [modal, setModal]  = useState(false)
    const columns = [
        {
          name: 'Folio',
          selector: 'id',
          sortable: true,
          maxWidth: '225px'
        },
        {
          name: 'Incidente',
          selector: 'issue',
          sortable: true,
          minWidth: '225px'
        },
        {
          name: 'Estatus',
          selector: 'status',
          sortable: true,
          minWidth: '225px',
          cell: row => {
            return (
                <h5>{typeStatus(row.status)}</h5>
            )
          }
        },
        {
          name: 'Acciones',
          allowOverflow: true,
          cell: row => {
              return (
                  <Edit cursor={'pointer'} size={15} onClick={() => {
                    dispatch({type:type.selectTicket, payload: row})
                    history.push('/dashboard/ticket-description')
                  }}/>
              )
          }
        }
    ]

    return (
        <div>
            {loading ? (
              <Loader backgroundActive/>
            ) : ( 
              <TableZeroConfig 
                title={'Tickets'} 
                columns={columns}
                dataD={ticket ? ticket : data}
                textButton={'Agregar ticket'}
                modal={() => {
                    setModal(true)
                }}
                showButton={true}
            />
            )}
            
            <TicketModal textEdit={'Nuevo ticket'} open={modal} handleModal={()  => setModal(false)}/>
        </div>
    )
}

export default Client
