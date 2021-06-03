import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getMedidores} from '../../../redux/actions/medidor/index'
import {useEffect} from 'react'

const data = [
    {
        id:1,
        issue:"Se detecto un error en la pantalla de inicio",
        status: 'No atendido'
    }
]


const Medidor = () => {
    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getMedidores())
    }

    useEffect(() => {
        console.log('Aqui')
        getData()
    }, [])

    const columns = [
        {
          name: 'idMedidor',
          selector: 'id',
          sortable: true,
          maxWidth: '225px'
        },
        {
          name: 'numeroMedidor',
          selector: 'issue',
          sortable: true,
          minWidth: '225px'
        },
        {
            name: 'watts',
            selector: 'status',
            sortable: true,
            minWidth: '225px'
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
        }
        /*{
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
        }*/
    ]

    return (
        <div>
            <h1>Pantalla Medidor</h1>
            <TableZeroConfig 
                title={'Medidores'} 
                columns={columns}
                dataD={data}
                showButton={false}
            />
        </div>
    )
}

export default Medidor

