import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth, useCurrentUser } from '../auth/auth'

import Profile from '../pages/profile'
import LoadingScreen from '../components/loadingscreen'

const LoadProfile = () => {
    const [data, setData] = useState({ fetched: null, isFetching: false })
    const { currentUser } = useCurrentUser()
    const { authToken } = useAuth();

    useEffect(() => {
        setData({ fetched: null, isFetching: true })
        try {
            const fetchUserData = async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/id?id=${currentUser}`, {
                    headers: {
                        Authorization: 'Bearer ' + authToken
                    }
                })
    
                if(response) {
                    if(response.data.status === 200) {
                        setData({ fetched: response.data.data, isFetching: false })
                    } else {
                        setData({ fetched: null, isFetching: false })
                    }
                } else {
                    setData({ fetched: null, isFetching: false })
                }
            }
            fetchUserData()
        } catch(e) {
            setData({ fetched: null, isFetching: false })
            console.error(e)
        }
    }, [])

    return data.fetched && !data.isFetching ? (
        <Profile data={data.fetched}/>
    ) : (
        <LoadingScreen />
    )
}

export default LoadProfile