import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import { Redirect } from 'react-router-dom'
import { Edit } from 'react-feather'
import { useHistory } from 'react-router'
import {type} from '../../../redux/type'
import { useDispatch, useSelector } from 'react-redux'
import { getMedidores } from '../../../redux/actions/medidor/index'
import { useEffect, useState } from 'react'
import MedidorModal  from '../../../components/MedidorModal'
import { Row, CardBody, Button } from 'reactstrap'
import {closeModal, openModal} from '../../../redux/actions/medidor/uiMedidor'

const data = [
    {
        id: 1,
        issue: "Se detecto un error en la pantalla de inicio",
        status: 'No atendido'
    }
]

const Medidor = () => {
    const { medidores } = useSelector((state) => state.medidor)
    const userRole = useSelector((state) => state.auth.userData)
    const {openModal: isModalOpen} = useSelector((state) => state.ui)
 
    const [text, setText] = useState('Nuevo usuario')
    const [modal, setModal]  = useState(false)
    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getMedidores())
    }

    const isOpen = () => {
        dispatch(openModal())
    }

    const isClose = () => {
        dispatch(closeModal())
    }

    useEffect(() => {
        getData()
        console.log("UseEffect", getData())
    }, [])

    const history = useHistory()       

    const columns = [
        {
            name: 'id',
            selector: 'idMedidor',
            sortable: true,
            maxWidth: '250px'
        },
        {
            name: 'numeroMedidor',
            selector: 'numero_medidor',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'watts',
            selector: 'watts',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Fecha',
            selector: 'date',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                const date = row.date
                if (date) {
                    const d = new Date(date)
                    return d.toLocaleDateString()
                }
            }
        },
        (userRole.role === 'ADMIN' || 'REPORTES') && {
          name: 'Acciones',
          allowOverflow: true,
          cell: row => {
            return (
                <Edit cursor={'pointer'} size={15} onClick={() => {
                  history.push('/dashboard/medidor-review')
                  dispatch({type:type.getMedidor, payload: row})
                }}/>
            )
          }
        }
    ]

    return (
        <div>
            <div>
                <Button onClick={() => {
                    const {role} = userRole
                    if (role === 'ADMIN' || 'CAPTURADOR') { 
                        console.log("Button")
                        isOpen()
                    }
                }}>
                Crear Medidor</Button>
            </div>
            <TableZeroConfig
                title={'Medidores'}
                columns={columns}
                dataD={medidores}
                showButton={false}
                modal={() => {
                    setModal(true)
                    setText('Nuevo Medidor')
                }}
            />
            <MedidorModal textEdit={text} open={isModalOpen} handleModal={ () => isClose()} />   
        </div>
    )
}

export default Medidor

