import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useAuth, useCurrentUser } from '../auth/auth'
import SHA256 from '../auth/sha256'

import { 
    Anchor,
    Box,
    Button,
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Form, 
    FormField,
    Heading,
    MaskedInput,
    Text,
    TextInput
} from 'grommet'

import LoadingScreen from '../components/loadingscreen'

const init = {
    email: '',
    password: ''
}

const Login = () => {
    const [loginData, setLoginData] = useState(init)
    const [loginProcess, setLoginProcess] = useState({ error: null, isLoggingIn: false })

    let history = useHistory()
    let location = useLocation()
    let { setAuthToken } = useAuth()
    let { setCurrentUser } = useCurrentUser()
    let { from } = location.state || { from: { pathname: "/" } }

    const handleLogin = async () => {
        setLoginProcess({ error: null, isLoggingIn: true })
        try {
            if(
                loginData.email !== '' &&
                loginData.password !== ''
            ) {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
                    email: loginData.email,
                    password: SHA256(loginData.password)
                })
                if(response) {
                    if(response.data.status === 200) {
                        setLoginProcess({ error: null, isLoggingIn: false })
                        setLoginData(init)

                        setAuthToken(response.data.token)
                        setCurrentUser(response.data.data.id)
                        history.replace(from)
                    }
                    
                    if(response.data.status === 404) {
                        console.log(response)
                        setLoginProcess({ error: `Es konnte kein user mit der Email '${loginData.email}' gefunden werden!`})
                        setLoginData(init)
                    }
                }
            } else {
                setLoginProcess({ error: 'Bitte geben Sie eine gültige Email Adresse und Passwort ein!', isLoggingIn: false })
            }
        } catch(e) {
            setLoginProcess({ error: 'Etwas ist schief gelaufen', isLoggingIn: false })
            console.error(e)
        }
    }

    return (
        <Box fill direction="row" justify="center" align="center">
            <Card 
                width="medium-large" 
                alignSelf="center" 
                background="background-front" 
                pad="small" 
                round="medium"
                elevation="medium"
            >
                <CardHeader background="background-front" round={{size: "medium", corner: "top"}}>
                    <Box 
                        fill="horizontal" 
                        direction="row"
                        justify="center"
                        align="center"
                    >
                        <Heading level="2">Login</Heading>
                    </Box>
                </CardHeader>

                <CardBody background="background-front">
                    <Form
                        value={loginData}
                        onChange={val => {
                            setLoginData(val)
                        }}
                        onSubmit={() => handleLogin()}
                    >
                        <FormField label="Email" name="email" required >
                            <MaskedInput
                                name="email"
                                mask={[
                                    { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                                    { fixed: '@' },
                                    { regexp: /^[\w]+$/, placeholder: 'mail' },
                                    { fixed: '.' },
                                    { regexp: /^[\w]+$/, placeholder: 'com' },
                                ]}
                            />
                        </FormField>

                        <FormField label="Passwort" name="password" required >
                            <TextInput 
                                name="password"
                                type="password"
                            />
                        </FormField>

                        <Box 
                            fill="horizontal" 
                            direction="row"
                            justify="center"
                            align="center"
                            pad="small"
                        >
                            <Button primary type="submit" label={<Text weight="bold">Login</Text>}/>
                        </Box>
                        {loginProcess.error && (
                            <Box 
                                fill="horizontal" 
                                direction="row"
                                justify="center"
                            >
                                <Text color="status-critical" textAlign="center" >{loginProcess.error}</Text>
                            </Box>
                        )}
                        {loginProcess.isLoggingIn && (
                            <Box 
                                fill="horizontal" 
                                direction="row"
                                justify="center"
                            >
                                <LoadingScreen />
                            </Box>
                        )}
                    </Form>
                </CardBody>

                <CardFooter background="background-front" round={{size: "medium", corner: "bottom"}}>
                    <Box fill="horizontal" direction="row" justify="between" pad={{horizontal: "medium", vertical: "small"}}>
                        <Text>Noch keinen Account?</Text>
                        <Anchor onClick={() => history.push('/register')}>Registrieren</Anchor>
                    </Box>
                </CardFooter>
            </Card>
        </Box>
    )
}

export default Login