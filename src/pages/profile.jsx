import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useTheme } from '../styles/themeContext'
import { useHistory } from 'react-router'
import { useAuth, useCurrentUser } from '../auth/auth'

import { 
    Avatar,
    Box, 
    Button,
    Heading,
    Header,
    Text,
    TextArea,
    TextInput,
    Form,
    FormField,
    Layer,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Paragraph
} from 'grommet'

import {
    Sun as SunIcon,
    Moon as MoonIcon,
    User as UserIcon,
    Logout as LogoutIcon,
    Close as CloseIcon,
    Add as AddIcon
} from 'grommet-icons'

import LoadingScreen from '../components/loadingscreen'

const ProfileBody = styled.div`
    height: 89vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow-y: auto;
`;

const ProfileHeader = (props) => {

    return(
        <Box fill="horizontal" align="center">
            <Avatar background="brand" size="large">
                <UserIcon size="medium"/>
            </Avatar>
            <Heading level="1" margin="xsmall">{props.userData.username}</Heading>
            <Heading level="5" margin="none" color="text-weak">{props.userData.email}</Heading>
        </Box>
    )
}

const PersonalInfo = (props) => {
    const [userDataForm, setUserDataForm] = useState({ email: props.userData.email, username: props.userData.username })
    const [isEditing, setIsEditing] = useState(false)

    return (
        <Box 
            fill="horizontal" 
            margin={{top: "large"}}
            pad={{bottom: "small"}}
        >
            <Form
                value={userDataForm}
                onChange={(newData) => setUserDataForm(newData)}
                onReset={() => {
                    setUserDataForm({ email: props.userData.email, username: props.userData.username })
                    setIsEditing(false)
                }}
                onSubmit={() => {
                    props.setUserData(prevState => ({
                        ...prevState,
                        email: userDataForm.email,
                        username: userDataForm.username
                    }))
                    setIsEditing(false)
                }}
            >
                <Box direction="row" align="center" justify="between" fill="horizontal">
                    <Heading level="3"  alignSelf="start">Persönliche Daten</Heading>
                    
                    <Box direction="row" align="center" justify="end">
                        {isEditing ? (
                            <Box direction="row" gap="small">
                                <Button 
                                    primary
                                    type="submit"
                                    label="Speichern"
                                />
                                <Button 
                                    secondary
                                    type="reset"
                                    label="Abbrechen"
                                />
                            </Box>
                        ) : (
                            <Button 
                                label="Ändern"
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                    </Box>
                </Box>

                <Box direction="row" justify="between" align="center">
                    <Text>Email:</Text>
                    <Box width="70%">
                        <FormField name="email">
                            <TextInput 
                                plain
                                name="email"
                                focusIndicator={false}
                                disabled={!isEditing}
                            />
                        </FormField>
                    </Box>
                </Box>
                <Box direction="row" justify="between" align="center">
                    <Text>Nutzername:</Text>
                    <Box width="70%">
                        <FormField name="username">
                            <TextInput 
                                plain
                                name="username"
                                focusIndicator={false}
                                disabled={!isEditing}
                            />
                        </FormField>
                    </Box>
                </Box>
            </Form>
        </Box>
    )
}

const ThemeBox = () => {
    const [isLight, setIsLight] = useState(true)

    const { currentTheme, setCurrentTheme } = useTheme()

    useEffect(() => {
        setIsLight(currentTheme === 'light' ? true : false)
    }, [currentTheme])

    return (
        <Box 
            direction="row" 
            justify="between" 
            align="center" 
            pad={{bottom: "medium"}}
            border={{side: "bottom", size:"small"}}
        >
            <Text>Theme:</Text>
            <Box direction="row" justify="around" gap="xsmall">
                <Box 
                    background={!isLight ? "brand" : "background-contrast"}
                >
                    <Button 
                        icon={<SunIcon />} 
                        disabled={isLight}
                        onClick={() => {
                            setCurrentTheme('light')
                            setIsLight(true)
                        }}
                    />
                </Box>
                <Box 
                    background={isLight ? "brand" : "background-contrast"}
                >
                    <Button 
                        icon={<MoonIcon />} 
                        disabled={!isLight}
                        onClick={() => {
                            setCurrentTheme('dark')
                            setIsLight(false)
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

const LogoutBox = () => {
    const [showConfirmationLayer, setShowConfirmationLayer] = useState(false)
    let history = useHistory()

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userToken')
        history.push('/login')
    }

    return (
        <Box
            fill="horizontal"
            align="center"
            pad={{vertical: "medium"}}
        >
            <Button
                primary
                color="status-critical"
                onClick={() => setShowConfirmationLayer(true)}
                label="Ausloggen"
                icon={<LogoutIcon />}
            />
            {showConfirmationLayer && (
                <Layer
                    onEsc={() => setShowConfirmationLayer(false)}
                >
                    <Card pad="medium" gap="small" round="none">
                        <CardHeader>
                            <Heading margin="none">Logout</Heading>
                        </CardHeader>

                        <CardBody>
                            <Paragraph>Möchten Sie sich wirklich ausloggen?</Paragraph>
                        </CardBody>

                        <CardFooter>
                            <Box 
                                fill="horizontal"
                                direction="row"
                                justify="around"
                                align="center"
                                gap="medium"
                            >
                                <Button 
                                    secondary
                                    label="Abbrechen"
                                    icon={<CloseIcon />}
                                    color="status-critical"
                                    round={false}
                                    onClick={() => setShowConfirmationLayer(false)}
                                />
                                <Button 
                                    primary
                                    label="Ausloggen"
                                    icon={<LogoutIcon />}
                                    color="status-critical"
                                    onClick={() => logout()}
                                />
                            </Box>
                        </CardFooter>
                    </Card>
                </Layer>
            )}
        </Box>
    )
}

const AdminBox = () => {
    const [isCreating, setIsCreating] = useState(false)

    const [creatingResponse, setCreatingResponse] = useState({ isLoading: false, error: null })
    const [trigger, setTrigger] = useState('')
    const [message, setMessage] = useState('')
    const [responseString, setResponseString] = useState('')

    let { authToken } = useAuth()
    let { currentUser } = useCurrentUser()

    const createResponse = async () => {
        setCreatingResponse({ isLoading: true, error: null })
        if(
            trigger !== '' &&
            message !== ''
        ) {
            let payload;
            if(responseString !== '') {
                let responses = responseString.split(';').map(response => {return response.trim()})
                payload = {
                    created_by: currentUser,
                    trigger: trigger,
                    message: message,
                    responses: responses
                }
            } else {
                payload = {
                    created_by: currentUser,
                    trigger: trigger,
                    message: message
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/chatbot-answers/create`, payload, {
                headers: {
                    Authorization: 'Bearer ' + authToken
                }
            })
            console.log(response)
            if(response) {
                if(response.status === 200) {
                    console.log(response.data)
                    setCreatingResponse({ isLoading: false, error: null })
                } else {
                    console.log(response)
                    setCreatingResponse({ isLoading: false, error: 'Etwas ist schief gelaufen!' })
                }
            } else {
                setCreatingResponse({ isLoading: false, error: 'Etwas ist schief gelaufen!' })
            }
        } else {
            setCreatingResponse({ isLoading: false, error: 'Bitte geben Sie eine gültige User Nachricht oder Chatbot Antwort an!' })
        }
    }

    return (
        <Box 
            fill="horizontal" 
            margin={{bottom: "large"}}
            pad={{top: "medium"}}
        >
            <Box 
                direction="column" 
            >
                <Box fill="horizontal" direction="row" justify="between" align="center">
                    <Heading level="3"  alignSelf="start">Chatbot</Heading>
                    {isCreating ? (
                        <Button
                            secondary
                            label="Abbrechen"
                            icon={<CloseIcon />}
                            onClick={() => {
                                setIsCreating(false)
                                setTrigger('')
                                setMessage('')
                                setResponseString('')
                            }}
                        />
                    ) : (
                        <Button
                            primary
                            label="Neue Antwort"
                            icon={<AddIcon />}
                            onClick={() => setIsCreating(true)}
                        />
                    )}
                </Box>

                {isCreating && (
                    <Box gap="small">
                        <Box 
                            fill="horizontal" 
                            direction="row" 
                            justify="between" 
                            align="center"
                        >
                            <Text>User Nachricht:</Text>
                            <Box width="70%">
                                <TextArea 
                                    rows={1}
                                    resize={false}
                                    placeholder="Was ist ein PTB?"
                                    focusIndicator={false}
                                    value={trigger}
                                    onChange={e => setTrigger(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Box 
                            fill="horizontal" 
                            direction="row" 
                            justify="between" 
                            align="center"
                        >
                            <Text>Chatbot Antwort:</Text>
                            <Box width="70%">
                                <TextArea 
                                    rows={1}
                                    resize={false}
                                    placeholder="Ein PTB ist..."
                                    focusIndicator={false}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Box 
                            fill="horizontal" 
                            direction="row" 
                            justify="between" 
                            align="center"
                        >
                            <Text>Optionale Antworten:</Text>
                            <Box width="70%">
                                <TextArea 
                                    rows={1}
                                    resize={false}
                                    placeholder="Ja;Nein..."
                                    focusIndicator={false}
                                    value={responseString}
                                    onChange={e => setResponseString(e.target.value)}
                                />
                            </Box>
                        </Box>

                        <Box
                            fill="horizontal"
                            align="center"
                        >
                            <Button
                                primary
                                label="Hinzufügen"
                                onClick={() => createResponse()}
                            />
                        </Box>
                        {creatingResponse.isLoading && (
                            <LoadingScreen size="component"/>
                        )}
                        {creatingResponse.error && (
                            <Box alignSelf="center">
                                <Text color="status-critical">{creatingResponse.error}</Text>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

const Profile = (props) => {
    const [userData, setUserData] = useState(props.data)
    let history = useHistory()

    return (
        <Box fill>
            <Header height="8vh" justify="end">
                <Box 
                    pad="xsmall"
                    margin={{right: "small"}}
                    round="xsmall"
                    hoverIndicator={{background: "background-contrast"}}
                    onClick={() => history.push('/')}
                >
                    <CloseIcon size="large"/>
                </Box>
            </Header>

            <ProfileBody>
                <Box 
                    width="large" 
                    background="background" 
                    round="medium"
                    direction="column"
                    alignSelf="center"
                    pad={{vertical: "medium", horizontal: "large"}}
                    margin={{vertical: "large"}}
                >
                    <ProfileHeader userData={userData}/>

                    <PersonalInfo userData={userData} setUserData={setUserData}/>

                    <ThemeBox />

                    {userData.admin && (
                        <AdminBox />
                    )}

                    <LogoutBox />
                </Box>
            </ProfileBody>
        </Box>
    )
}

export default Profile