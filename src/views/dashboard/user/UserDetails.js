import React, { useState } from 'react'
import { client } from '../../../helpers/AppSyncClient'
import { createTicketHistoryTableDev } from '../../../graphql/mutations'
import {
    Button,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Label
  } from 'reactstrap'
import { User } from 'react-feather'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {updateUser} from '../../../redux/actions/user'
import UpdatePasswordModal from '../../../components/UpdatePasswordModal'
import Swal from 'sweetalert2'


const UserDetails = () => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const userSelected = useSelector(state => state.user.userSelected)

    const [form, setForm] = useState({
        fullname: userSelected.fullname
    })
    
    const submit = (e) => {
        e.preventDefault()
        if (form.fullname.length > 0) {
            dispatch(updateUser({ ...form }))
        } else {
            Swal.fire({
                icon: "error",
                title: "Rellene los campos faltantes"
            })
        }
    }
    return (
        <div>
            <FormGroup>
                <Label for='full-name'>Nombre</Label>
                <InputGroup>
                    <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <User size={15} />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Input id='full-name' placeholder='name' value={form.fullname} onChange={(e) => {
                        setForm({...form, fullname: e.currentTarget.value.trim()})
                    }} />
                </InputGroup>
            </FormGroup>
            <Button className='mr-1' color='primary' onClick={submit}>
                Guardar
            </Button>
            <Button color='secondary' onClick={() => {
                setVisible(true)
            }} outline>
                Cambiar contraseña
            </Button>
            <UpdatePasswordModal open={visible} handleModal={() => setVisible(false)} />
            <Button onClick={async () => {
                try {
                    const resp = await client.graphql({
                        query:createTicketHistoryTableDev,
                        variables: { input: {
                            messageId: 180, senderid: 2, ticketid: 11, title: "titulodfasfsdf", message: "este es un mensaje", img: "src/img/mi/imagen/.png"
                        }}
                    })
                  console.log(resp)
                } catch (e) {
                    console.log(e)
                }
            }}>Click</Button>
        </div>
    )
}
export default UserDetails
