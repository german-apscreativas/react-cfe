import React, { useEffect, useState } from 'react'
import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import { Edit } from 'react-feather'
import { useHistory } from 'react-router'

import { Row, CardBody, Button } from 'reactstrap'
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {filterTickets, getTickets} from '../../../redux/actions/ticket'
import { useUserByFilter } from '../../../hooks/useUserByFilter'
import {typeStatus} from '../../../helpers/TypeStatus'
import { type } from '../../../redux/type'
import {Loader} from '../../../components/Loader/Loader'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'


const data = [
    {
        id:1,
        issue:"Se detecto un error en la pantalla de inicio",
        status: 'No atendido'
    }
]

const Tickets = () => {
    const options = [
        { value: 'ATENDIDO', label: 'Atendido' },
        { value: 'NO_ATENDIDO', label: 'No atendido' },
        { value: 'FINALIZADO', label: 'Finalizado' },
        { value: 'CERRADO', label: 'Cerrado' }
    ]

    const userData = useSelector((state) => state.auth.userData)
    const [word, setWord] = useState('')

    const [{data: usersFound, error}] = useUserByFilter(word)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState({
        status: null,
        fecha: null,
        useractiveid: null
    })
    if (userData.roles_name === 'CUSTOMER') return <Redirect to="/dashboard/home" /> 
    const ticket = useSelector((state) => state.ticket.tickets)
    const dispatch = useDispatch()
    useEffect(() => {
        setLoading(true)
        dispatch(getTickets())
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    const history = useHistory()
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
            name: 'Usuario',
            selector: 'fullname',
            sortable: true,
            minWidth: '225px'
        },
        {
            name: 'Fecha',
            selector: 'time_response',
            sortable: true,
            minWidth: '225px',
            cell: row => {
              const date = row.createdAt
              if (date) {
                  const d = new Date(date)
                  return d.toLocaleString()
              }
            }
        },
        {
          name: 'Acciones',
          allowOverflow: true,
          cell: row => {
              return (
                  <Edit cursor={'pointer'} size={15} onClick={() => {
                    history.push('/dashboard/ticket-description')
                    dispatch({type:type.selectTicket, payload: row})
                  }}/>
              )
          }
        }
    ]
    if (loading) {
        return <Loader backgroundActive/>
    }

    return (
        <div>
            <Row className='match-height'>
                <CardBody>
                    <div className="filter_container" >
                        <div>
                        <Select
                            options={options}
                            onKeyDown={(e) => {
                                console.log(e.target.value)
                            }}
                            onChange={(e) => {
                                setFilter({...filter, status: e.value })
                            }}
                        />
                        </div>
                        <div>
                            <input type="date" className="date_input" placeholder="Fecha de busqueda" onChange={(e) => {
                                setFilter({...filter, fecha: e.currentTarget.value })
                            }} />
                        </div>
                        <div>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue, callback) => {
                                    callback(usersFound)
                                }}
                                onInputChange={(e) => {
                                    setWord(e)
                                }}
                                onChange={(e) => {
                                    console.log(e.value)
                                    setFilter({...filter, useractiveid: String(e.value) })
                                }}
                            />
                        </div>
                    </div>
                    <div style={{paddingTop: "10px"}}>
                        <Button onClick={() => {
                            console.log(filter)
                            dispatch(filterTickets(filter))
                        }}>Filtrar</Button>
                    </div>
                </CardBody>
            </Row>
            <TableZeroConfig 
                title={'Tickets'} 
                columns={columns}
                dataD={ticket ? ticket : data}
                showButton={false}
            />
        </div>
    )
}

export default Tickets
