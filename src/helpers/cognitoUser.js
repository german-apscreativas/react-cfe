import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID
}

const UserPool = new CognitoUserPool(poolData)

export const registerUser = (userPool, email, password) => {
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, [], null, (error, data) => {
            if (error) reject(error)
            resolve(data)
        })
    })
}

export const verifyCode = (user, code) => {
    return new Promise((resolve, reject) => {
        user.confirmRegistration(code, true, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}


export default UserPool