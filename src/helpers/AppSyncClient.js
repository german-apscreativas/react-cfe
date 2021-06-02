import API from '@aws-amplify/api'
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'

const client = API

/* if (process.env.NODE_ENV === 'development') {
  client = new AWSAppSyncClient({
    url: process.env.REACT_APP_GRAPHQL_API,
    region: process.env.REACT_APP_GRAPHQL_API,
    auth: {
      type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
      apiKey: process.env.REACT_APP_API_KEY
    }
  })
}*/


export { client }