// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import { User, X } from 'react-feather'
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
import {useSelector, useDispatch} from 'react-redux'
import {updatePassword} from '../redux/actions/user'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Swal from 'sweetalert2'
import { type } from '../redux/type'

const UpdatePasswordModal = ({ open, handleModal, textEdit = "Actualizar password" }) => {
  // ** State
  
  const dispatch = useDispatch()    
  const [form, setForm] = useState({
    password: '',
    repeatPassword: '' 
  })  
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => {
    setForm({...form, name: ''})
    handleModal()
  }} />
  const submitForm = (e) => {
    if (form.password === form.repeatPassword) {
      if (form.password.length > 0) {
        dispatch(updatePassword(form.password))
        setForm({password: "", repeatPassword: ""})
        handleModal()
      } else {
        Swal.fire({
          icon: 'error',
          title:"Rellene los campos"
        })
      } 
    } else {
      Swal.fire({
        icon: 'error',
        title:"Las contraseñas no coinciden"
      })
    }
  }
  return (
    <Modal
      isOpen={open}
      toggle={() => {
        setForm({...form, name: ''})
        handleModal()
      }}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{textEdit}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='full-name'>Contraseña</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='full-name' type="password" placeholder='Password' value={form.password} onChange={(e) => {
              setForm({...form, password: e.currentTarget.value})
            }} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='password-repeat'>Confirmar Contraseña</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='full-name' type="password" placeholder='password' value={form.repeatPassword} onChange={(e) => {
              setForm({...form, repeatPassword: e.currentTarget.value})
            }} />
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary' onClick={submitForm}>
          Guardar
        </Button>
        <Button color='secondary' onClick={() => {
              handleModal()
          }} outline>
          Cancelar
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default UpdatePasswordModal
