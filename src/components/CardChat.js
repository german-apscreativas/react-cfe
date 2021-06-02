import classnames from 'classnames'
import { useState, useEffect, useRef } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MoreVertical, Send, Image } from 'react-feather'
import {Loader} from './Loader/Loader'
import { onCreateTicketHistoryTableDev } from '../graphql/subscriptions'
import ImageZoom from 'react-medium-image-zoom'
import { Card, CardHeader, Form, Label, InputGroup, InputGroupAddon, Input, InputGroupText, Button } from 'reactstrap'

import '@styles/base/pages/app-chat-list.scss'
import { useDispatch, useSelector } from 'react-redux'
import {createTicketHistory, ticketHistory, ticketHistoryPage} from '../redux/actions/ticket'
import Swal from 'sweetalert2'
import CardBody from 'reactstrap/lib/CardBody'

const data = {
  chat: {
    id: 2,
    userId: 1,
    unseenMsgs: 0,
    chat: [
     /* {
        message: "How can we help? We're here for you!",
        time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
        senderId: 11
      },
      {
        message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
        time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
        senderId: 1
      },
      {
        message: 'It should be Bootstrap 4 compatible.',
        time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
        senderId: 1
      },
      { message: 'Absolutely!', time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)', senderId: 11 },
      {
        message: 'Modern admin is the responsive bootstrap 4 admin template.!',
        time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
        senderId: 11
      },
      { message: 'Looks clean and fresh UI.', time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)', senderId: 1 },
      { message: "It's perfect for my next project.", time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)', senderId: 1 },
      { message: 'How can I purchase it?', time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)', senderId: 1 },
      { message: 'Thanks, from ThemeForest.', time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)', senderId: 11 },
      { message: 'I will purchase it for sure. 👍', time: '2020-12-08T13:52:38.013Z', senderId: 1 }
    */]
  },
  contact: {
    id: 1,
    fullName: 'Felecia Rower',
    status: 'away'
  }
}

const CardChat = () => {
  const ticket = useSelector(state => state.ticket)
  const user = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()
  const [msg, setMsg] = useState('')
  const [img, setImg] = useState(null)
  // const [chatRef, setChatRef] = useState(null)
  const [chatData, setChatData] = useState(data)
  const chatRef = useRef(null)
  
  useEffect(() => {
    dispatch(ticketHistory())
  }, [])


  //** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog = []
    if (chatData) {
      chatLog = chatData.chat.chat
    }

    const formattedChatLog = []
    const chatMessageSenderId = user.id ? user.id : undefined
    let msgGroup = {
      senderId: chatMessageSenderId,
      messages: []
    }
    ticket.historyTicketSelected.forEach((msg, index) => {
      if (chatMessageSenderId === msg.senderid) {
        msgGroup.messages.push({
          title: msg.title,
          msg: msg.message,
          img: msg.img
          // time: msg.time
        })
      } else {
        // chatMessageSenderId = msg.senderid
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.senderid,
          messages: [
            {
              title: msg.title,
              msg: msg.message,
              img: msg.img
              // time: msg.time
            }
          ]
        }
      }
      if (index === ticket.historyTicketSelected.length - 1) formattedChatLog.push(msgGroup)
    })

    return formattedChatLog
  }

  //** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.senderId !== 11
          })}
        >
          

          <div className='chat-body'>
            {item.messages.map(chat => (
              <div key={chat.msg} className='chat-content'>
                <h5>{chat.title}</h5>
                <p>{chat.msg}</p>
                {chat.img && (
                  <ImageZoom
                    image={{
                      src: chat.img,
                      alt: 'Image ticket',
                      // className: 'img',
                      style: { width: '100%' }
                    }}
                    zoomImage={{
                      src: chat.img,
                      alt: 'Image ticket',
                      style: {zIndex: 1000}
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    })
  }

  //** Scroll to chat bottom
  const scrollToBottom = () => {
    dispatch(ticketHistoryPage())
    console.log(chatRef.current.el.scrollTop)
    chatRef.current.el.scrollTop = 200 + chatRef.current.el.scrollTop
    // chatRef.scrollTop = Number.MAX_SAFE_INTEGER
    console.log("object")
  }

  useEffect(() => {
    if (chatRef !== null) {
      // scrollToBottom()
    }
  }, [chatRef, chatData.chat.chat.length])

  const handleSendMsg = e => {
    e.preventDefault()
    if (msg.length > 0) {
      dispatch(createTicketHistory(msg, img))
      setMsg('')
      setImg(null)  
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Rellene los campos primero'
      })
    }
  }

  return (
    <Card className='chat-widget'>
      <CardHeader>
        <div className='d-flex align-items-center'>
          <h5 className='mb-0'>Historial con el cliente</h5>
        </div>
        <MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <div className='chat-app-window' >
        {ticket.loading && <Loader backgroundActive /> }
        {/* 
        <PerfectScrollbar
          containerRef={el => setChatRef(el)}
          className='user-chats scroll-area'
          options={{ wheelPropagation: false }}
        > */}
        
          <InfiniteScroll
            dataLength={ticket.historyTicketSelected.length}
            inverse={true}
            height={400}
            hasMore={ticket.hasMore}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            loader={<h4>Loading...</h4>}
            next={scrollToBottom}
            scrollableTarget="scrollableDiv"
            ref={chatRef}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b> No hay mas datos que cargar </b>
              </p>
            }
          >
            <div className='chats'>
              {renderChats()}
            </div>
          </InfiniteScroll>
        {/* </PerfectScrollbar> */}
        <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
          <InputGroup className='input-group-merge mr-1 form-send-message'>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Label className='attachment-icon mb-0' for='attach-doc'>
                  <Image className='cursor-pointer text-secondary' size={14} />
                  <input type='file' id='attach-doc' onChange={async (e) => {
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
                      const resep = await response.json()
                      if (resp.src) {
                        setImg(resp.src)
                      }
                    } catch (e) {
                      Swal.fire({
                        icon: 'error',
                        title: 'No se pudo subir la imagen'
                      }) 
                    }
                  }} hidden />
                </Label>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              value={msg}
              className='border-0'
              onChange={e => setMsg(e.target.value)}
              placeholder='Escribe tu mensaje'
            />
          </InputGroup>
          <Button className='send' color='primary'>
            <Send size={14} className='d-lg-none' />
            <span className='d-none d-lg-block'>Enviar</span>
          </Button>
        </Form>
        {img && (
          <>
            <CardBody>
              Imagen Cargada
            </CardBody>
          </>
        )}
      </div>
    </Card>
  )
}

export default CardChat
