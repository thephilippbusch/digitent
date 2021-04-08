import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth, useCurrentUser } from '../auth/auth'

import Home from '../pages/home'
import LoadingScreen from '../components/loadingscreen'

const LoadHome = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false })
    const { authToken } = useAuth()
    const { currentUser } = useCurrentUser()

    useEffect(() => {
        const fetchData = async () => {
            setData({ fetched: data, isFetching: true })
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/id?id=${currentUser}`, {
                    headers: {
                        Authorization: 'Bearer ' + authToken
                    }
                })
                if(response) {
                    if(response.status === 200) {
                        setData({ fetched: response.data, isFetching: false })
                    } else {
                        setData({ fetched: null, isFetching: false })
                    }
                } else {
                    setData({ fetched: null, isFetching: false })
                }
           } catch(e) {
               setData({ fetched: null, isFetching: false })
               console.error(e)
           }
        }
        fetchData()
    }, [])

    return data.fetched && !data.isFetching ? (
        <Home data={data.fetched}/>
    ) : (
        <LoadingScreen />
    )
}

export default LoadHome;