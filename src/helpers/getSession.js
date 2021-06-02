import UserPool from './cognitoUser'

const getSession = () => {
    return new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser()
        if (user) {
            user.getSession((err, session) => {
                if (err) reject(err)
                resolve(session)
            })
        } else {
            reject()
        }
    })
}

export default getSession