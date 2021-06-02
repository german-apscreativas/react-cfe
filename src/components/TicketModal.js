// ** React Imports
import { useState, useEffect } from 'react'

import {useSelector, useDispatch} from 'react-redux'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
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
import ImageZoom from 'react-medium-image-zoom'
import {getDepartments} from '../redux/actions/department'
import {createTicket} from '../redux/actions/ticket'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Swal from 'sweetalert2'

const TicketModal = ({ open, handleModal, textEdit = "Nuevo Usuario" }) => {
  // ** State
  const [form, setForm] = useState({
    issue: '',
    urgence: '',
    departmentid: '',
    description: '',
    img: ''
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDepartments())
  }, [])

  const departments = useSelector((state) => state.department.departments)

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const submit = (e) => {
    e.preventDefault()
    if (form.issue.length > 0 && form.urgence.length && form.departmentid.length) {
      dispatch(createTicket(form))
      handleModal()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Rellene los campos'
      }) 
    }
  }

  const changeFile = async (e) => {
    try {

      const formData = new FormData()
      const files = e.currentTarget.files
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        formData.append('file', file)
      }
      const response = await fetch(`${process.env.REACT_APP_API_URI}/upload-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })
      const resp = await response.json()
      if (resp.originalUrl) {
        setForm({...form, img: resp.originalUrl})
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: "No se pudo subir la imagen"
      })
    }
  }

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
          <Label for='full-name'>Incidencia</Label>
          <InputGroup>
            <Input id='full-name' placeholder='Escribir incidencia' value={form.issue} onChange={(e) => {
              setForm({...form, issue: e.currentTarget.value})
            }} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='full-name'>Descripción</Label>
          <InputGroup>
            <textarea onChange={(e) => {
              setForm({...form, description: e.currentTarget.value})
            }} className="form-select" value={form.description}>
            </textarea>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Urgencia</Label>
          <InputGroup>
            <select className="selector" value={form.urgence} onChange={(e) => {
                setForm({...form, urgence: e.nativeEvent.target.value})
            }}>
              <option value="">Seleccionar urgencia</option>
              <option value="NORMAL">Normal</option>
              <option value="MEDIO">Media</option>
              <option value="URGENTE">Urgente</option>
            </select>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Departamento</Label>
          <InputGroup>
            <select className="selector" value={form.departmentid} onChange={(e) => {
                setForm({...form, departmentid: e.nativeEvent.target.value})
            }}>
              <option value="">Seleccionar departamento</option>
              {departments.map((item) => (
               <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Subir imagen</Label>
          <InputGroup>
            <input type="file" onChange={changeFile} accept="image/*" multiple />
          </InputGroup>
        </FormGroup>
        {form.img.length > 0 && (
          <>
            <FormGroup style={{textAlign: 'center'}}>
              <img src={form.img} className="img_uploaded" />
            </FormGroup>
          </>
        )}
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

export default TicketModal
