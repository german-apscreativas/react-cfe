// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
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
import {useSelector, useDispatch} from 'react-redux'
import {createDepartment, updateDepartment} from '../redux/actions/department'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { type } from '../redux/type'
import swal from 'sweetalert2'

const DepartmentModal = ({ open, handleModal, textEdit = "Nuevo departamento" }) => {
  // ** State
  
  const department = useSelector((state) => state.department.departmentSelected)
  const dispatch = useDispatch()    
  const [form, setForm] = useState({
    name: '' 
  })  
  useEffect(() => {
    if (department.name) {
      setForm({...form, name: department.name})
    }
  }, [department])
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => {
    setForm({...form, name: ''})
    handleModal()
  }} />
  const submitForm = (e) => {
    if (form.name.length > 0) {
      if (department && department.id) dispatch(updateDepartment({id: department.id, name: form.name}))
      else dispatch(createDepartment(form.name))
      setForm({...form, name: ''})
      handleModal()
    } else {
      swal({
        icon: 'error',
        title: 'Rellene los campos'
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
          <Label for='full-name'>Nombre</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='full-name' placeholder='Bruce Wayne' value={form.name} onChange={(e) => {
              setForm({...form, name: e.currentTarget.value})
            }} />
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary' onClick={submitForm}>
          Guardar
        </Button>
        <Button color='secondary' onClick={() => {
            setForm({...form, name:''})
            dispatch({type: type.cleanDepartment})
            handleModal()
          }} outline>
          Cancelar
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default DepartmentModal
