import React, { useEffect, useState } from 'react'
import { useTheme } from '../styles/themeContext'

import { 
    Box, Button
} from 'grommet'

const Profile = (props) => {
    const [isLight, setIsLight] = useState(true)
    const { currentTheme, setCurrentTheme } = useTheme()

    useEffect(() => {
        console.log(props.data)
        setIsLight(currentTheme === 'light' ? true : false)
    }, [])

    return (
        <Box fill direction="column" justify="center" align="center">
            <Button 
                disabled={isLight}
                label="Light"
                color="light-1"
                onClick={() => {
                    setCurrentTheme('light')
                    setIsLight(true)
                }}
            />
            <Button 
                disabled={!isLight}
                label="Dark"
                color="dark-1"
                onClick={() => {
                    setCurrentTheme('dark')
                    setIsLight(false)
                }}
            />
        </Box>
    )
}

export default Profile