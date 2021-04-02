import React, { useEffect, useState } from 'react'

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
    Avatar,
    Button,
    ThemeContext
} from 'grommet'

import {
    Send,
    FormClose
} from 'grommet-icons'

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

const Message = (props) => {
    const message = props.message
    const [disableButtons, setDisableButtons] = useState(false)

    return message.from === "user" ? (
        <ThemeContext.Extend value={customMeMessageBoxTheme}>
            <Box 
                background="brand" 
                pad="small"
                margin="xsmall"
                alignSelf="end"
            >
                <Text>{message.message}</Text>
            </Box>
        </ThemeContext.Extend>
    ) : (
        <ThemeContext.Extend value={customOtherMessageBoxTheme}>
            <Box 
                background="background-contrast" 
                pad="small"
                margin="xsmall"
                alignSelf="start"
            >
                <Text>{message.message}</Text>
                {message.hasOwnProperty('answers') && message.answers.map((text, index) => {
                    return (
                        <Button 
                            key={index} 
                            label={text} 
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
    const [connection, setConnection] = useState({ connected: true, isConnecting: false })
    const [sendMessage, setSendMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ws = props.socket
    
    ws.onopen = () => {
        console.log('connected!')
    }

    ws.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        setMessages(messages.concat(msg))
    }

    const toggleSendMessage = (message) => {
        if(message !== '' || !message) {
            ws.send(message)
            setSendMessage('')
        }
    }

    return(
        <Card width="large" height="large" round="medium">
            <CardHeader background="background-back" round={{size: "medium", corner: "top"}}>
                <Box direction="row" justify="start" align="end" pad={{vertical: "small", horizontal: "medium"}} >
                    <Heading margin="none">Chat-Bot</Heading>
                    {connection.isConnecting && (
                        <Text margin={{left: "small"}} color="text-xweak">connecting...</Text>
                    )}
                </Box>
                <Box 
                    margin="small"
                    pad="small"
                    round="small"
                    onClick={() => console.log('closing')}
                    hoverIndicator={{background: "background-front"}}
                >
                    <FormClose size="medium"/>
                </Box>
            </CardHeader>
            <CardBody background="background" direction="column" justify="end" pad="medium">
                    {(messages || []).map((message, index) => {
                        return (<Message key={index} message={message} toggleSendMessage={toggleSendMessage}/>)
                    })}
            </CardBody>
            <CardFooter background="background-back" round={{size: "medium", corner: "bottom"}}>
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
                    <Avatar 
                        border={{ size: "medium", color: "brand" }}
                        size="medium"
                        onClick={() => toggleSendMessage(sendMessage)}
                        hoverIndicator={{background: "brand"}}
                        disabled={!connection.connected}
                    >
                        <Send size="medium"/>
                    </Avatar>
                </Box>
            </CardFooter>
        </Card>
    )
}

export default Chat