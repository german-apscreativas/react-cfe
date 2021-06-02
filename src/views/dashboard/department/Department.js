import React, { useState, useEffect } from 'react'
import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import { Edit } from 'react-feather'
import DepartmentModal from '../../../components/DepartmentModal'
import {useSelector, useDispatch} from 'react-redux'
import {Loader} from '../../../components/Loader/Loader'
import {Redirect} from 'react-router-dom'
import { getDepartments } from '../../../redux/actions/department'
import { type } from '../../../redux/type'
const data = [
    {
        id:1,
        name:"Financieros"
    }
]

const Department = () => {
    const departments = useSelector((state) => state.department.departments)
    const loading = useSelector((state) => state.department.loading)
    const userData = useSelector((state) => state.auth.userData)
    if (userData.roles_name !== 'ADMIN') return <Redirect to="/dashboard/home" /> 
  
    const dispatch = useDispatch()    
    useEffect(() => {
        dispatch(getDepartments())
    }, [])

    const [text, setText] = useState('Nuevo departamento')
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
                        setText('Editar departamento')
                        console.log(row)
                        dispatch({type: type.selectDepartment, payload: row})
                        setModal(true)
                    }}/>
              )
          }
        }
    ]

    return (
        <div>
            {loading && <Loader backgroundActive /> }
                <TableZeroConfig 
                    title={'Departamentos'} 
                    columns={columns}
                    dataD={departments ? departments : []}
                    textButton={'Agregar departamento'}
                    modal={() => {
                        setModal(true)
                        setText('Nuevo Departamento')
                    }}
                />
            
            
            <DepartmentModal textEdit={text} open={modal} handleModal={()  => {
                setModal(false)
                dispatch({type: type.cleanDepartment})
            }} />    
        </div>
    )
}

export default Department
