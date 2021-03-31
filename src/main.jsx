import React from 'react'
import { Grommet } from 'grommet'
import { globalGrommetTheme } from './styles/globalTheme'
import LoadHome from './loader/loadHome'

const Main = () => {
    const ws = new WebSocket("ws://localhost:8000/ws")

    return(
        <Grommet theme={globalGrommetTheme} themeMode="dark">
            <LoadHome socket={ws}/>
        </Grommet>
    )
}

export default Main;