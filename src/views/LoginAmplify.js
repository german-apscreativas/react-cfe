import React from 'react'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react'

Amplify.configure(config)

const LoginAmplify = () => {


    return (
        <div className="RegisterAndLogin">
            <header className="RegisterAndLogin-header"> 
                <AmplifySignOut />
                <h2>Login and Register</h2> 
            </header>
        </div>
    )
} 

export default  withAuthenticator(LoginAmplify) 