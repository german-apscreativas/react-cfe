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

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const UserModal = ({ open, handleModal, textEdit = "Nuevo Usuario" }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

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
            <Input id='full-name' placeholder='Bruce Wayne' />
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
            <Input id='post' placeholder='example@hotmail.com' />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Contraseña</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='post' placeholder='123456' type="password" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Rol</Label>
          <InputGroup>
            <select className="selector">
              <option value="">Seleccionar rol</option>
              <option value="">Facturacion</option>
              <option value="">Recursos humanos</option>
            </select>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Departamento</Label>
          <InputGroup>
            <select className="selector">
              <option value="">Seleccionar departamento</option>
              <option value="">Facturacion</option>
              <option value="">Recursos humanos</option>
            </select>
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary' onClick={handleModal}>
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
