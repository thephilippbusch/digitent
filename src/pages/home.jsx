import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useAuth, useCurrentUser } from '../auth/auth'

import {
    Box,
    Heading,
    Button,
    Avatar,
    Header,
    Layer,
    Text,
    Drop,
    TextInput
} from 'grommet'

import {
    Menu as MenuIcon,
    Close as CloseIcon,
    User as UserIcon,
    Robot as RobotIcon,
    Add as AddIcon
} from 'grommet-icons'

import Chat from '../home/chat'
import LoadingScreen from '../components/loadingscreen'

const ContactList = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`

const User = (props) => {
    const [chatData, setChatData] = useState({ fetched: null, isFetching: false })
    const [newChatDrop, setNewChatDrop] = useState(false)
    const [chatError, setChatError] = useState(null)
    const chatDropTarget = useRef()
    const { authToken } = useAuth()

    const getChat = async () => {
        try {
            setChatData({ fetched: chatData, isFetching: true })
            const payload = {
                "user_id": props.currentUser,
                "contact_id": props.contact.user_id
            }
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/chats/get-chat-by-user-contact`, payload, {
                headers: {
                    Authorization: 'Bearer ' + authToken
                }
            })
            if(response) {
                console.log(response.data)
                if(response.data.status === 200) {
                    setChatData({ fetched: response.data.data, isFetching: false })
                    setChatError(null)
                }
                if(response.data.status === 404) {
                    setChatData({ fetched: null, isFetching: false })
                    setChatError(null)
                }
            } else {
                setChatData({ fetched: null, isFetching: false })
                setChatError('Etwas ist schief gelaufen!')
            }
        } catch(e) {
            console.log(e)
            setChatData({ fetched: null, isFetching: false })
            setChatError('Etwas ist schief gelaufen!')
        }
    }

    const newChat = async () => {
        try {
            if(props.currentChat) {
                props.currentChat.close()
            }
            const payload = {
                "user_1": props.currentUser,
                "user_2": props.contact.user_id 
            }
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/chats/new_chat`, payload, {
                headers: {
                    Authorization: 'Bearer ' + authToken
                }
            })
            if(response) {
                if(response.data.status === 200) {
                    props.openChat(response.data.data)
                }
            }
        } catch(e) {
            console.log(e)

        }
    }

    useEffect(() => {
        getChat()
    }, [])

    return (
        <>
            <Box
                fill="horizontal"
                direction="row"
                justify="start"
                align="center"
                gap="medium"
                round="small"
                pad="small"
                hoverIndicator={{background: "background-contrast"}}
                focusIndicator={false}
                ref={chatDropTarget}
                onClick={() => {
                    setNewChatDrop(newChatDrop ? false : true)
                }}
            >
                <Avatar background="neutral-4">
                    <UserIcon />
                </Avatar>
                <Heading margin="none" weight="bold" level="3">{props.contact.username}</Heading>
            </Box>
            {newChatDrop && (
                <Drop
                    target={chatDropTarget.current}
                    align={{left: "right"}}
                    margin={{left: "medium"}}
                    round="medium"
                    onClickOutside={() => setNewChatDrop(false)}
                >
                    <Box pad={{vertical: "medium"}} direction="column" justify="start" align="center">
                        {!chatData.isFetching ? (
                            chatData.fetched ? (
                                <Button 
                                    primary
                                    label="Zum Chat"
                                    onClick={() => {
                                        console.log(chatData.fetched)
                                        props.openChat(chatData.fetched.chat_id)
                                    }}
                                />
                            ) : (
                                <Button
                                    primary
                                    label="Neuen Chat starten"
                                    onClick={() => {
                                        console.log("Neuer Chat!")
                                        newChat()
                                    }}
                                />
                            )
                        ) : (
                            <LoadingScreen size="component"/>
                        )}
                        {chatError && (
                            <Text textAlign="center" color="status-critical">{chatError}</Text>
                        )}
                    </Box>
                </Drop>
            )}
        </>
    )
}

const Home = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentChat, setCurrentChat] = useState(null)
    const [isPraxiChat, setIsPraxiChat] = useState(false)
    const [channel, setChannel] = useState(null)
    const userData = props.data.data

    const { currentUser } = useCurrentUser()
    const { authToken } = useAuth()
    const history = useHistory()

    const [contactsData, SetContactsData] = useState({ fetched: null, isFetching: false })
    const [contactFetchError, setContactFetchError] = useState()
    const [contactDrop, setContactDrop] = useState(false)
    const [newContactEmail, setNewContactEmail] = useState('')
    const contactDropTarget = useRef()

    const getContactList = async () => {
        try {
            const fetchContacts = async () => {
                SetContactsData({ fetched: contactsData, isFetching: true })
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/get_contact_details?id=${currentUser}`, {
                    headers: {
                        Authorization: 'Bearer ' + authToken
                    }
                })

                if(response) {
                    console.log(response)
                    if(response.data.status === 200) {
                        SetContactsData({ fetched: response.data.data, isFetching: false })
                        setContactFetchError(null)
                    }
                    if(response.data.status === 404) {
                        SetContactsData({ fetched: [], isFetching: false })
                        setContactFetchError(null)
                    }
                }
            }
            fetchContacts()
        } catch(e) {
            console.log(e)
            SetContactsData({ fetched: null, isFetching: false })
            setContactFetchError('Etwas ist schief gelaufen!')
        }
    }

    const addContact = async () => {
        try {
            if(newContactEmail !== '') {
                let payload = {
                    "user_id": currentUser,
                    "contact_email": newContactEmail
                }
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/add_contact`, payload, {
                    headers: {
                        Authorization: 'Bearer ' + authToken
                    }
                })

                if(response) {
                    console.log(response)
                    if(response.data.status === 200) {
                        setContactDrop(false)
                        getContactList()
                    }
                }
            }
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getContactList();
    }, [props.data])

    const openPraxiChat = (chan) => {
        setChannel(chan)
        setIsPraxiChat(true)
        setSidebarOpen(false)
        let ws = new WebSocket(`ws://localhost:8000/praxi/${chan}`)
        setCurrentChat(ws)
    }

    const openChat = (chan) => {
        setChannel(chan)
        setIsPraxiChat(false)
        setSidebarOpen(false)
        let ws = new WebSocket(`ws://localhost:8000/ws/${chan}`)
        setCurrentChat(ws)
    }

    return (
        <Box fill>
            {sidebarOpen && (
                <Layer
                    position="left"
                    onEsc={() => {
                        setSidebarOpen(false)
                        setContactDrop(false)
                    }}
                    onClickOutside={() => {
                        setSidebarOpen(false)
                        setContactDrop(false)
                    }}
                >
                    <Box
                        width="medium"
                        height="100vh"
                        pad="small"
                    >
                        <Header>
                            <Heading level="1">Menü</Heading>
                            <Box
                                pad="small"
                                round="medium"
                                onClick={() => {
                                    setSidebarOpen(sidebarOpen ? false : true)
                                    setContactDrop(false)
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

                        <Box fill>
                            <Box
                                fill="horizontal"
                                direction="row"
                                justify="start"
                                align="center"
                                gap="medium"
                                round="small"
                                pad="small"
                                hoverIndicator={{background: "background-contrast"}}
                                onClick={() => {
                                    openPraxiChat(`praxi${currentUser}`)
                                }}
                            >
                                <Avatar background="brand">
                                    <RobotIcon />
                                </Avatar>
                                <Heading margin="none" weight="bold" level="3">Praxi</Heading>
                            </Box>

                            <Box
                                border={{side: "top", size: "small"}}
                                direction="row"
                                justify="between"
                                align="center"
                                pad={{vertical: "small"}}
                            >
                                <Heading level="3" margin="none">Kontakte</Heading>
                                <Box
                                    round="50%"
                                    pad="xsmall"
                                    ref={contactDropTarget}
                                    hoverIndicator={{background: "background-contrast"}}
                                    onClick={() => setContactDrop(true)}
                                >
                                    <AddIcon
                                        color="brand" 
                                    />
                                </Box>
                            </Box>

                            {contactDrop && (
                                <Drop
                                    target={contactDropTarget.current}
                                    align={{left: 'right'}}
                                    margin={{left: "medium"}}
                                >
                                    <Box pad={{top: "xsmall", horizontal: "small"}} direction="row" justify="between" align="center">
                                        <Heading margin="none" level="4">Kontakt hinzufügen!</Heading>
                                        <Box pad="small" onClick={() => setContactDrop(false)}>
                                            <CloseIcon size="small" color="status-critical"/>
                                        </Box>
                                    </Box>
                                    <Box pad={{bottom: "small", horizontal: "medium"}} direction="row" justify="between" align="center">
                                        <TextInput onChange={e => setNewContactEmail(e.target.value)} value={newContactEmail} />
                                        <Box pad="small" onClick={() => addContact()}>
                                            <AddIcon />
                                        </Box>
                                    </Box>
                                </Drop>
                            )}
                            
                            <ContactList>
                                {contactsData.fetched && !contactsData.isFetching ? (
                                    contactsData.fetched.map((contact, index) => {
                                        return (
                                            <User 
                                                key={index} 
                                                contact={contact} 
                                                currentUser={currentUser} 
                                                openChat={openChat}
                                                currentChat={currentChat}
                                            />
                                        )
                                    })
                                ) : (
                                    <LoadingScreen size="component" />
                                )}
                                {contactFetchError && (
                                    <Text color="status-critical">{contactFetchError}</Text>
                                )}
                            </ContactList>
                        </Box>
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
                    <Heading>Willkommen {userData.username}!</Heading>
                </Box>
                
                <Box margin="small">
                    <Avatar background="neutral-1" onClick={() => history.push('/profile')} size="medium">
                        <UserIcon/>
                    </Avatar>
                </Box>
            </Header>

            <Box fill justify="center" align="center">
                {currentChat && (
                    <Chat socket={currentChat} setCurrentChat={setCurrentChat} channel={channel} isPraxiChat={isPraxiChat}/>
                )}
            </Box>
        </Box>
    )
}

export default Home