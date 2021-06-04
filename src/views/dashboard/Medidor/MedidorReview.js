import { Fragment, useEffect, useState } from 'react'

import classnames from 'classnames'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, CardText, Table, Media, Button } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { client } from '../../../helpers/AppSyncClient'
import { useDispatch, useSelector } from 'react-redux'
import { type } from '../../../redux/type'
import { changeUserTicket, createTicketHistory, ticketHistory, updateStatusTicket } from '../../../redux/actions/ticket'
import { getDepartments } from '../../../redux/actions/department'
import { useUserByDepartment } from '../../../hooks/useUserByDepartments'
import { Redirect, useHistory } from 'react-router'
import ImageZoom from 'react-medium-image-zoom'
import CardChat from '../../../components/CardChat'
import { Loader } from '../../../components/Loader/Loader'
import Swal from 'sweetalert2'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { onCreateTicketHistoryTableDev } from '../../../graphql/subscriptions'
import 'react-notifications/lib/notifications.css'
import {upMedidor} from '../../../redux/actions/medidor/index'

const colorUrgence = {
    NORMAL: 'success',
    MEDIO: 'warning',
    URGENTE: 'danger'
}
const MedidorReview = () => {

    const dispatch = useDispatch()

    const { medidorData } = useSelector((state) => state.medidor)

    const { idMedidor, numero_medidor, watts, date } = medidorData

    const [formValues, setFormValues] = useState({ numero_medidor, watts })

    const submit = (e) => {
        e.preventDefault()
        if (formValues.numero_medidor.length > 0
            && formValues.watts.length > 0
        ) {
            dispatch(upMedidor({ idMedidor, numero_medidor: formValues.numero_medidor, watts: formValues.watts }))
        }
        setFormValues({
            numero_medidor: '',
            watts: ''
        })
    }

    const id = true
    if (!id) return <Redirect to="/dashboard/medidor" />
    const history = useHistory()

    const [loading, setLoading] = useState(false)

    /*const getMedidor = () => {
        dispatch(getMedidor())
    }*/

    /*useEffect(() => {
        getMedidor()
        console.log("UseEffectReview", getMedidor())
    }, [])*/
    if (loading) {
        return <Loader backgroundActive />
    }
    return (
        <Fragment>
            <Row className='match-height'>
                <Col md='12' sm='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4'>
                                ID: <small className='text-muted'>{idMedidor}</small>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <form onSubmit="Update">
                        <label>numeroMedidor</label>
                        <input className="form-control" type="text" value={formValues.numero_medidor} onChange={(event) => setFormValues({ ...formValues, numero_medidor: event.target.value })} />
                        <label>Watts</label>
                        <input className="form-control" type="text" value={formValues.watts} onChange={(event) => setFormValues({ ...formValues, watts: event.target.value })} />
                        <label>Fecha</label>
                        <input className="form-control" type="date" value={date} />
                    </form>
                    <p />
                    <Button className='mr-1' color='primary' onClick={submit}>
                        Guardar
                    </Button>
                </Col>
                <Col md='12' sm='12'>
                </Col>
            </Row>
            <NotificationContainer priority />
        </Fragment>
    )
}
export default MedidorReview
