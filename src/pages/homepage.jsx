import React, { useEffect, useState } from 'react'

import {
    Box,
    Main,
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

import Chat from './chat'

const HomePage = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        console.log(sidebarOpen)
    })

    return (
        <Main fill="horizontal" height="100vh" background="url(background-robot.jpeg)">
            <Box fill background={{color: "dark-1", opacity: "medium"}}>
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
                        hoverIndicator={{background: "light-3"}}
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
                        <Avatar background="neutral-1" onClick={() => console.log('profile page')} size="medium">
                            <User/>
                        </Avatar>
                    </Box>
                </Header>

                <Box fill justify="center" align="center">
                    <Chat socket={props.socket}/>
                </Box>
            </Box>
        </Main>
    )
}

export default HomePage