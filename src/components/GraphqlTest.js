
import gql from 'graphql-tag'
import { client } from '../helpers/AppSyncClient'
import React, {useState, useEffect} from 'react'
import {listTicketHistoryTableDevs} from '../graphql/queries'


export const GraphqlTest = () => {
    const [state, setState] = useState({})
    const fetchNotes = async () => {
        try {
          const resp = await client.graphql({
              query: listTicketHistoryTableDevs,
              variables: {
                  limit: 1
              }
          })
          console.log(resp.data.listTicketHistoryTableDevs.items)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log('que onda')
        fetchNotes()
    }, [])


    return (
        <div>
            <h1>Hola</h1>    
        </div>
    )
}
