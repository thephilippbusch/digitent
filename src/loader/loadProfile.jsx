import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth, useCurrentUser } from '../auth/auth'

import Profile from '../pages/profile'
import LoadingScreen from '../components/loadingscreen'

const LoadProfile = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false })
    const { currentUser } = useCurrentUser()
    const { authToken } = useAuth();

    useEffect(() => {
        console.log(props)
        setData({ fetched: null, isFetching: true })
        try {
            const fetchUserData = async () => {
                let payload = {
                    id: currentUser
                }
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/id`, payload, {
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
        <Profile {...props} data={data.fetched}/>
    ) : (
        <LoadingScreen />
    )
}

export default LoadProfile