import { Fragment, useEffect, useState } from 'react'

import classnames from 'classnames'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, CardText, Table, Media, Button } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { client } from '../../../helpers/AppSyncClient'
import {useDispatch, useSelector} from 'react-redux'
import { type } from '../../../redux/type'
import { changeUserTicket, createTicketHistory, ticketHistory, updateStatusTicket } from '../../../redux/actions/ticket'
import { getDepartments } from '../../../redux/actions/department'
import {useUserByDepartment} from '../../../hooks/useUserByDepartments'
import { Redirect, useHistory } from 'react-router'
import ImageZoom from 'react-medium-image-zoom'
import CardChat from '../../../components/CardChat'
import {Loader} from '../../../components/Loader/Loader'
import Swal from 'sweetalert2'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import { onCreateTicketHistoryTableDev } from '../../../graphql/subscriptions'
import 'react-notifications/lib/notifications.css'


const colorUrgence = {
  NORMAL: 'success',
  MEDIO: 'warning',
  URGENTE: 'danger'
}
const TicketReview = () => {
  useEffect(() => {
    const subscription = client.graphql({
      query: onCreateTicketHistoryTableDev
    }).subscribe({
      next: data => {
        NotificationManager.info('Se ha escrito un mensaje')
        console.log("subscription", data)
      }
    })
    /*return () => {
      subscription.unsubscribe()
    } */
    return () => {
      console.log("object")
      subscription.unsubscribe()
    }
  }, [])
  
  const {id, issue, urgence, status, departmentid, useractiveid, description, img} = useSelector(state => state.ticket.ticketSelected)
  const {roles_name} = useSelector(state => state.auth.userData)
  const departments = useSelector(state => state.department.departments)
  const historyTicketSelected = useSelector(state => state.ticket.ticketSelected)
  if (!id) return <Redirect to="/dashboard/tickets" /> 
  const history = useHistory()
  
  const [form, setForm] = useState({
    departmentid,
    status,
    useractiveid
  })
  const [state] = useUserByDepartment(form.departmentid.length === 0 ? departmentid : form.departmentid)
  const {data} = state

  const typeStatus = () => {
    switch (status) {
      case 'NO_ATENDIDO':
        return 'No atendido'
      case 'EN_PROGRESO':
        return 'Atendido'
      case 'FINALIZADO':
        return 'Finalizado'
      case 'CERRADO':
        return 'Cerrado'
      default:
        return 'No atendido'
    }
  }
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDepartments())
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      dispatch({type: type.cleanTicket})
    }
  }, [])
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
                Folio <small className='text-muted'>#{id}</small>
                </CardTitle>
            </CardHeader>
            <CardBody>
                <h4>Título</h4>
                <CardText>{issue}</CardText>
                <h5>Descripción</h5>
                <CardText>
                  <p>{description}</p>
                </CardText>
                {historyTicketSelected.img && (
                  <>
                    <h5>Imagen cargada:</h5>
                    <div style={{textAlign: 'center'}} >
                      <ImageZoom
                        image={{
                          src: historyTicketSelected.img,
                          alt: 'Image ticket',
                          // className: 'img',
                          style: { maxWidth: '400px', maxHeight: '400px' }
                        }}
                        zoomImage={{
                          src: historyTicketSelected.img,
                          alt: 'Image ticket',
                          style: {zIndex: 1000}
                        }}
                      />
                    </div>
                  </>
                )}
                {/* <img  src={'https://i.stack.imgur.com/vmZ4t.jpg'} style={{width:"100%"}}/>ZZZ */}
            </CardBody>
            <CardBody>
                <div >
                    <h5>Estatus: {typeStatus()}</h5>
                    <button className={`btn btn-${colorUrgence[urgence]}`}>{urgence}</button>
                </div>
            </CardBody>
            
            <div style={{display: 'flex'}}>
            {roles_name !== 'CUSTOMER' && (
              <CardBody>
                <h4>Cambiar estatus</h4>
                <select className="selector" style={{borderRadius: '5px'}} onChange={(e) => {
                  if (e.currentTarget.value.length > 0) {
                    dispatch(updateStatusTicket(e.currentTarget.value, history))
                  }
                }}>
                  <option value="">Seleccionar un status</option>
                  <option value="EN_PROGRESO" selected={status === 'EN_PROGRESO'}>En progreso</option>
                  <option value="FINALIZADO" selected={status === 'FINALIZADO'}>Finalizado</option>
                </select>
              </CardBody>
            )}
            {roles_name !== 'CUSTOMER' && (
              <CardBody>
                <h4>Cambiar ticket de persona</h4>
                <div>
                  <select className="selector" style={{marginBottom: '5px'}} onChange={(e) => {
                      setForm({...form, departmentid: e.currentTarget.value})
                  }}>
                    <option value="">Seleccionar departamento</option>
                    {departments.map((item) => (
                      <option key={item.id}  value={item.id}>{item.name}</option>
                    ))}
                  </select>
                  <select onChange={(e) => {
                      setForm({...form, useractiveid: e.currentTarget.value})
                  }} className="selector" style={{borderRadius: '5px'}}>
                    <option value="">Seleccionar usuario</option>
                    {data.map((item) => (
                      <option value={item.id} key={item.id}>{item.fullname}</option>
                    ))}
                  </select>
                </div>
                
                <Button style={{marginTop: '20px'}} onClick={() => {
                    if (form.useractiveid.length > 0 && form.departmentid.length > 0) {
                      dispatch(changeUserTicket({departmentid: form.departmentid, useractiveid: form.useractiveid}, history))
                    }
                  }}>Guardar Cambios</Button>
              </CardBody>
            )}
            </div>
            {
              roles_name === 'CUSTOMER' && (
                <CardBody>
                  <Button onClick={() => {
                      Swal.fire({
                        title: '¿Desea cerrar este incidente?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí',
                        cancelButtonText: 'Cancelar'
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          dispatch(updateStatusTicket('CERRADO', history))
                        }
                      })
                  }}>Cerrar incidente</Button>
                </CardBody>
              )
            }
            
        </Card>
        </Col>
        <Col md='12' sm='12'>
        <Card>
            {/* <div style={{   
                height:'500px',
                width:'80%', 
                background: 'linear-gradient(180deg, rgba(248, 248, 248, 0.95) 44%, rgba(248, 248, 248, 0.46) 73%, rgba(255, 255, 255, 0))',
                margin: '0 auto',
                borderRadius: '5px'
            }}>
                <PerfectScrollbar
                    component='li'
                    className='media-list scrollable-container'
                >
                    {historyTicketSelected.map((item, index) => {
                    return (
                        <Media
                            className={classnames('d-flex', {
                            'align-items-start': !item.switch,
                            'align-items-center': item.switch
                            })}
                        >
                          <Fragment>
                              <Media body>
                              <Media tag='p' heading>
                                <span className='font-weight-bolder'>{item.title}</span>
                              </Media>
                              <small className='notification-text'>{item.message}</small>
                              </Media>
                          </Fragment>
                        </Media>
                    )
                    })}
                </PerfectScrollbar>
            </div> */}
            <CardBody>
              <CardChat />   
                {/* <div >
                    <div>
                        <textarea className="form-select" value={message} onChange={(e) => {
                          setMessage(e.currentTarget.value)
                        }}>
                        </textarea>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button onClick={() => {
                          dispatch(createTicketHistory(message))
                          setMessage('')
                        }}>Mensaje</Button>
                    </div>
                </div>  */}
            </CardBody>        

        </Card>
        </Col>
      </Row>
      <NotificationContainer priority/>
    </Fragment>
  )
}
export default TicketReview
