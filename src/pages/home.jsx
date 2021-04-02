import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import {
    Box,
    Heading,
    Button,
    Avatar,
    Header,
    Layer
} from 'grommet'

import {
    Menu as MenuIcon,
    Close as CloseIcon,
    User
} from 'grommet-icons'

// import Chat from '../home/chat'

const Home = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const history = useHistory()

    useEffect(() => {
        console.log(props.data)
    }, [props.data])

    return (
        <Box fill>
            {sidebarOpen && (
                <Layer
                    position="left"
                    onEsc={() => setSidebarOpen(false)}
                    onClickOutside={() => setSidebarOpen(false)}
                >
                    <Box
                        width="medium"
                        height="100vh"
                        pad="small"
                    >
                        <Header>
                            <Heading level="1">Menu</Heading>
                            <Box
                                pad="small"
                                round="medium"
                                onClick={() => {
                                    setSidebarOpen(sidebarOpen ? false : true)
                                }}
                                hoverIndicator={{background: "light-3"}}
                            >
                                <Button
                                    plain
                                    icon={<CloseIcon size="large" color="dark-1"/>}
                                    focusIndicator={false}
                                />
                            </Box>
                        </Header>
                    </Box>
                </Layer>
            )}

            <Header height="8vh">
                <Box
                    pad="small"
                    margin="small"
                    round="medium"
                    onClick={() => {
                        setSidebarOpen(sidebarOpen ? false : true)
                    }}
                    hoverIndicator={{background: "background-back"}}
                >
                    <Button
                        plain
                        icon={<MenuIcon size="large" color="text-strong"/>}
                        focusIndicator={false}
                    />
                </Box>

                <Box>
                    <Heading>Praxi</Heading>
                </Box>
                
                <Box margin="small">
                    <Avatar background="neutral-1" onClick={() => history.push('/profile')} size="medium">
                        <User/>
                    </Avatar>
                </Box>
            </Header>

            <Box fill justify="center" align="center">
                {/* <Chat socket={props.socket}/> */}
            </Box>
        </Box>
    )
}

export default Home