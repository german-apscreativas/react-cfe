// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label
} from 'reactstrap'

import {useDispatch, useSelector} from 'react-redux'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { createUser } from '../redux/actions/user'

const UserModal = ({ open, handleModal, textEdit = "Nuevo Usuario" }) => {
  // ** State
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    telefono: '',
    role: '',
    rolid: '',
    departmentid: ''
  })
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault()
    if (form.fullname.length > 0 && form.email.length > 0 && form.password.length > 0 && form.rolid.length > 0 && form.departmentid.length > 0) {
      dispatch(createUser(form))
    }
    setForm({
      fullname: '',
      username: '',
      email: '',
      password: '',
      telefono: '',
      role: '',
      rolid: '',
      departmentid: ''
    })
    handleModal()
  }
  const state = useSelector(state => state)
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{textEdit}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='full-name'>Nombre Completo</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='full-name' placeholder='Bruce Wayne' value={form.name} onChange={(e) => {
              setForm({...form, fullname: e.currentTarget.value.trim()})
            }} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Correo Electronico</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='post' placeholder='example@hotmail.com' value={form.email} onChange={(e) => {
              setForm({...form, email: e.currentTarget.value.trim()})
            }} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='password'>Contraseña</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='password' value={form.password} onChange={(e) => {
              setForm({...form, password: e.currentTarget.value.trim()})
            }} placeholder='123456' type="password" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for>Rol</Label>
          <InputGroup>
            <select className="selector" value={form.rolid} onChangeCapture={(e) => {
              setForm({...form, rolid: e.nativeEvent.target.value})
            }}>
              <option value="">Seleccionar rol</option>
              {state.rol.roles.map((item, i) => (
                <option key={`R${i}}`} value={item.id}>{item.name}</option>
              ))}
            </select>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Departamento</Label>
          <InputGroup>
            <select className="selector" value={form.departmentid} onChangeCapture={(e) => {
              setForm({...form, departmentid: e.nativeEvent.target.value})
            }} >
              <option value="">Seleccionar departamento</option>
              {state.department.departments.map((item, i) => (
                <option key={`D${i}}`} value={item.id}>{item.name}</option>
              ))}
            </select>
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary' onClick={submit}>
          Guardar
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancelar
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default UserModal
