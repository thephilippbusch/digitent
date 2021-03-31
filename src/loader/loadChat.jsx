import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Chat from '../pages/chat'
import LoadingScreen from '../components/loadingscreen'

const LoadHome = () => {
    const [data, setData] = useState({ fetched: null, isFetching: false })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ fetched: data, isFetching: true })
                const response = await axios.get('http://localhost:8000/connect')
                if(response) {
                    if(response.status === 200) {
                        setData({ fetched: response.data, isFetching: false })
                    }
                }
           } catch(e) {
               setData({ fetched: null, isFetching: false })
               console.error(e)
           }
        }
        fetchData()
    }, [])

    return data.fetched && !data.isFetching ? (
        <Chat data={data.fetched}/>
    ) : (
        <LoadingScreen />
    )
}

export default LoadHome;