import React from 'react'
import './Loader.css'
import {Spinner} from 'reactstrap'

export const Loader = ({backgroundActive = false}) => {
  return (
    <div className="div-p" style={backgroundActive ? {backgroundColor: 'white'} : {}}>
      <div className="div-h">
        <Spinner color="primary" style={{ width: '4rem', height: '4rem' }} />
      </div>
    </div>
  )
}
