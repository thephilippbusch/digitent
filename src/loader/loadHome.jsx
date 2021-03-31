import axios from 'axios'
import React, { useEffect, useState } from 'react'

import HomePage from '../pages/homepage'
import LoadingScreen from '../components/loadingscreen'

const LoadHome = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ fetched: data, isFetching: true })
                const response = await axios.get('http://localhost:8000/test')
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
        <HomePage socket={props.socket} data={data.fetched}/>
    ) : (
        <LoadingScreen />
    )
}

export default LoadHome;