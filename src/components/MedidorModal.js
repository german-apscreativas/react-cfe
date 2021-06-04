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
import { createMedidor } from '../redux/actions/medidor/index'


const MedidorModal = ({ open, handleModal, textEdit = "Nuevo Medidor" }) => {
  // ** State
  const [form, setForm] = useState({
    numero_medidor: '',
    watts: ''
  })
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault()
    if (form.numero_medidor.length > 0 
      && form.watts.length > 0
      ) {
      dispatch(createMedidor({numero_medidor: form.numero_medidor, watts: form.watts}))
    }
    setForm({
      numero_medidor: '',
      watts: ''
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
          <Label for='full-name'>numero medidor</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='full-name' placeholder='RETER987ER' value={form.numero_medidor} onChange={(e) => {
              setForm({...form, numero_medidor: e.currentTarget.value.trim()})
            }} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Watts</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='post' placeholder='50' value={form.watts} onChange={(e) => {
              setForm({...form, watts: e.currentTarget.value.trim()})
            }} />
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

export default MedidorModal
