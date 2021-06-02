// ** Router Import
import {useEffect} from 'react'
import Router from './router/Router'
import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)


const App = props => {

useEffect(() => {
}, [])  

  return <Router />
}

export default App
