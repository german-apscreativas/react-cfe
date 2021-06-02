import React, { useEffect, useState } from 'react'
import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import { Edit } from 'react-feather'
import RolModal from '../../../components/RolModal'
import {useSelector, useDispatch} from 'react-redux'
import { getRoles } from '../../../redux/actions/roles'
import { type } from '../../../redux/type'
import {Loader} from '../../../components/Loader/Loader'
import {Redirect} from 'react-router-dom'

const data = [
    {
        id:1,
        name:"Financieros"
    }
]

const Roles = () => {
    const roles = useSelector((state) => state.rol.roles)
    const loading = useSelector((state) => state.rol.loading)
    const userData = useSelector((state) => state.auth.userData)
    if (userData.roles_name !== 'ADMIN') return <Redirect to="/dashboard/home" /> 
  
    const dispatch = useDispatch()    
    useEffect(() => {
        dispatch(getRoles())
    }, [])
    const [text, setText] = useState('Nuevo rol')
    const [modal, setModal]  = useState(false)
    const columns = [
        {
          name: 'ID',
          selector: 'id',
          sortable: true,
          maxWidth: '225px'
        },
        {
          name: 'Nombre',
          selector: 'name',
          sortable: true,
          minWidth: '225px'
        },
        {
          name: 'Acciones',
          allowOverflow: true,
          cell: row => {
              return (
                  <Edit cursor={'pointer'} size={15} onClick={() => {
                        setText('Editar rol')
                        setModal(true)
                        dispatch({type: type.selectRol, payload: row})
                    }}/>
              )
          }
        }
    ]

    return (
        <div>
            {loading ? <Loader backgroundActive /> : (
                <>
                <TableZeroConfig 
                    title={'Roles'} 
                    columns={columns}
                    dataD={roles ? roles : data}
                    textButton={'Agregar rol'}
                    modal={() => {
                        setModal(true)
                        setText('Nuevo rol')
                    }}
                />
                </>
            )}
            
            <RolModal textEdit={text} open={modal} handleModal={()  => {
                dispatch({type:type.cleanRoles})
                setModal(false)
            }} />    
        </div>
    )
}

export default Roles
