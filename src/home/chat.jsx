import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import aes256 from 'aes256'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Box,
    Heading,
    Text,
    FormField,
    TextInput, 
    Button,
    ThemeContext
} from 'grommet'

import {
    Send,
    FormClose
} from 'grommet-icons'
import { useCurrentUser } from '../auth/auth'

const customMeMessageBoxTheme = {
    box: {
      extend: `
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 15px;
      `
    }
}

const customOtherMessageBoxTheme = {
    box: {
      extend: `
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
      `
    }
}

const ChatBody = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

const Message = (props) => {
    const message = props.message
    const [disableButtons, setDisableButtons] = useState(false)

    return message.from === props.currentUser ? (
        <ThemeContext.Extend value={customMeMessageBoxTheme}>
            <Box 
                background="brand" 
                pad="small"
                margin="xsmall"
                alignSelf="end"
                width={{max: "70%"}}
            >
                <Text>{message.message}</Text>
            </Box>
        </ThemeContext.Extend>
    ) : (
        <ThemeContext.Extend value={customOtherMessageBoxTheme}>
            <Box 
                background="neutral-3" 
                pad="small"
                margin="xsmall"
                alignSelf="start"
                width={{max: "70%"}}
            >
                <Text>{message.message}</Text>
                {message.hasOwnProperty('answers') && message.answers && message.answers.map((text, index) => {
                    return (
                        <Button 
                            primary
                            key={index} 
                            label={text} 
                            color="text"
                            onClick={() => {
                                props.toggleSendMessage(text)
                                setDisableButtons(true)
                            }}
                            margin={{vertical: "xsmall"}}
                            disabled={disableButtons}
                        />
                    )
                })}
            </Box>
        </ThemeContext.Extend>
    )
}

const Chat = (props) => {
    const [connection, setConnection] = useState({ connected: false, isConnecting: false })
    const [sendMessage, setSendMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)
    const { currentUser } = useCurrentUser()
    const ws = props.socket
    const aesKey = props.isPraxiChat ? null : props.channel

    useEffect(() => {
        setConnection({ connected: false, isConnecting: true })
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const closeChat = () => {
        ws.close()
        props.setCurrentChat(null)
    }
    
    ws.onopen = () => {
        setConnection({ connected: true, isConnecting: false })
        console.log('connected!')
    }

    ws.onclose = event => {
        setConnection({ connected: false, isConnecting: false })
        props.setCurrentChat(null)
        console.log('Connection closed!')
    }

    ws.onmessage = (event) => {
        if(!props.isPraxiChat) {
            let msg = JSON.parse(event.data)
            console.log(msg.message)
            let decrypted_msg = aes256.decrypt(aesKey, msg.message)
            console.log(decrypted_msg)
            msg.message = decrypted_msg
            setMessages(messages.concat(msg))
        } else {
            let msg = JSON.parse(event.data)
            setMessages(messages.concat(msg))
        }
    }

    const toggleSendMessage = (message) => {
        if(message !== '' || !message) {
            if(!props.isPraxiChat) {
                console.log(message)
                let encrypted_msg = aes256.encrypt(aesKey, message)
                console.log(encrypted_msg)
                let payload = {
                    message: encrypted_msg,
                    user: currentUser
                }
                ws.send(JSON.stringify(payload))
                setSendMessage('')
            } else {
                let payload = {
                    message: message,
                    user: currentUser
                }
                ws.send(JSON.stringify(payload))
                setSendMessage('')
            }
        }
    }

    return(
        <Card width="large" height="large" round="medium">
            <CardHeader background="background-front" round={{size: "medium", corner: "top"}}>
                <Box direction="row" justify="start" align="end" pad={{vertical: "small", horizontal: "medium"}} >
                    <Heading margin="none">Chat-Bot</Heading>
                    {connection.isConnecting ? (
                        <Text margin={{left: "small"}} color="text-xweak">connecting...</Text>
                    ) : (
                        !connection.connected && (
                            <Text margin={{left: "small"}} color="text-xweak">disconnected</Text>
                        )
                    )}
                </Box>
                <Box 
                    margin="small"
                    pad="small"
                    round="small"
                    onClick={() => closeChat()}
                    hoverIndicator={{background: "background-front"}}
                >
                    <FormClose size="medium"/>
                </Box>
            </CardHeader>
            <CardBody background="background">
                <ChatBody>
                    <Box pad="medium" direction="column" justify="end">
                        {(messages || []).map((message, index) => {
                            return (<Message 
                                key={index} 
                                message={message} 
                                toggleSendMessage={toggleSendMessage} 
                                currentUser={currentUser}
                            />)
                        })}
                        <div ref={messagesEndRef}/>
                    </Box>
                </ChatBody>
            </CardBody>
            <CardFooter background="background-front" round={{size: "medium", corner: "bottom"}}>
                <Box 
                    pad="xsmall"
                    direction="row" 
                    justify="between" 
                    align="center" 
                    fill="horizontal" 
                >
                    <Box fill="horizontal" pad={{right: "medium", left: "small"}} justify="center">
                        <FormField>
                            <TextInput 
                                disabled={!connection.connected} 
                                placeholder="type something..."
                                value={sendMessage}
                                onChange={e => setSendMessage(e.target.value)}
                            />
                        </FormField>
                    </Box>
                    <Box 
                        round="50%"
                        pad="small"
                        disabled={!connection.connected}
                        onClick={() => toggleSendMessage(sendMessage)}
                        hoverIndicator={{background: "background-contrast"}}
                        extend={() => 'pointer-events: none'}
                    >
                        <Send size="medium" color="brand"/>
                    </Box>
                </Box>
            </CardFooter>
        </Card>
    )
}

export default Chat