import React, { useState, useEffect } from 'react'
import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import { Edit } from 'react-feather'
import UserModal from '../../../components/UserModal'
import { Row, CardBody, Button } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import { getUsers } from '../../../redux/actions/user'
import {Redirect, useHistory} from 'react-router-dom'
import { type } from '../../../redux/type'
import AsyncSelect from 'react-select/async'
import { useDepartmentByName } from '../../../hooks/useDepartmentByName'
import { useRoleByName } from '../../../hooks/useRoleByName'
import { Loader } from '../../../components/Loader/Loader'

const data = [
    {
        id:1,
        fullname:"Sergio Sosa",
        roles_name:"ADMIN",
        email: 'admin@example.com',
        department_name: "Todos"
    }
]
const User = () => {
    const dispatch = useDispatch()
    const [wordDep, setWordDep] = useState('')
    const [wordRol, setWordRol] = useState('')
    const [filter, setFilter] = useState({
        departmentid: null,
        rolid: null
    })
    const history = useHistory()
    const users = useSelector(state => state.user.users)
    const loading = useSelector(state => state.auth.loading)
    const [{data: departmentFilter}] = useDepartmentByName(wordDep)
    const [{data: rolesFilter}] = useRoleByName(wordRol)

    const userData = useSelector((state) => state.auth.userData)
    if (userData.roles_name !== 'ADMIN') return <Redirect to="/dashboard/home" /> 
  
    const [text, setText] = useState('Nuevo usuario')
    const [modal, setModal]  = useState(false)
    useEffect(() => {
      dispatch(getUsers())
    }, [])
    const columns = [
        {
          name: 'ID',
          selector: 'id',
          sortable: true,
          maxWidth: '225px'
        },
        {
          name: 'Nombre',
          selector: 'fullname',
          sortable: true,
          minWidth: '225px'
        },
        {
          name: 'Rol',
          selector: 'roles_name',
          sortable: true,
          minWidth: '225px'
        },
        {
          name:'Email',
          selector: 'email',
          sortable: true,
          minWidth: '225px'
        },
        {
          name: 'Departamento',
          selector: 'department_name',
          sortable: true,
          minWidth: '225px'
        },
        {
          name: 'Acciones',
          allowOverflow: true,
          cell: row => {
              return (
                  <Edit cursor={'pointer'} size={15} onClick={() => {
                        setText('Editar usuario')
                        setModal(true)
                        dispatch({type:type.selectUser, payload: row})
                        history.push('/dashboard/user-detail')
                    }}/>
              )
          }
        }
    ]

    return (
        <div>
          <Row className='match-height'>
                <CardBody>
                    <div className="filter_container" >
                        <div>
                            <AsyncSelect 
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue, callback) => {
                                    callback(departmentFilter)
                                }}
                                onInputChange={(e) => {
                                    setWordDep(e)
                                }}
                                onChange={(e) => {
                                    setFilter({...filter, departmentid: String(e.value) })
                                }}
                            />
                        </div>
                        <div>
                            <AsyncSelect 
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue, callback) => {
                                    callback(rolesFilter)

                                }}
                                onInputChange={(e) => {
                                    setWordRol(e)
                                }}
                                onChange={(e) => {
                                    setFilter({...filter, rolid: String(e.value) })
                                }}
                            />
                        </div>
                    </div>
                    <div style={{paddingTop: "10px"}}>
                        <Button onClick={() => {
                            let data = ``
                            for (const key in filter) {
                                if (filter[key] && filter[key].length > 0) {
                                    data += `${key}=${filter[key]}&`
                                }
                            }
                            data = data.slice(0, data.length - 1)
                            dispatch(getUsers(data)) 
                        }}>Filtrar</Button>
                    </div>
                </CardBody>
            </Row>
            <TableZeroConfig 
                title={'Usuarios'} 
                columns={columns}
                dataD={users ? users : data}
                textButton={'Agregar Usuario'}
                modal={() => {
                    setModal(true)
                    setText('Nuevo usuario')
                }}
            />
            
            <UserModal textEdit={text} open={modal} handleModal={()  => setModal(false)} />    
        </div>
    )
}

export default User
