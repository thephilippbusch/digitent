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
    password: '',
    confirm: '',
    username: ''
}

const Register = () => {
    const [registerData, setRegisterData] = useState(init)
    const [registerProcess, setRegisterProcess] = useState({ error: null, isRegistering: false })

    let history = useHistory()
    let location = useLocation()
    let { setAuthToken } = useAuth()
    let { setCurrentUser } = useCurrentUser()
    let { from } = location.state || { from: { pathname: "/" } }

    const handleRegister = async () => {
        setRegisterProcess({ error: null, isLoggingIn: true })
        try {
            if(
                registerData.email !== '' &&
                registerData.password !== '' &&
                registerData.username !== ''
            ) {
                if(registerData.password === registerData.confirm) {
                    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
                        email: registerData.email,
                        password: SHA256(registerData.password),
                        username: registerData.username
                    })
                    if(response.hasOwnProperty('data')) {
                        if(response.data.status === 200) {
                            console.log(response)
                            setRegisterProcess({ error: null, isLoggingIn: false })
                            setRegisterData(init)

                            setAuthToken(response.data.token)
                            setCurrentUser(response.data.data)
                            history.replace(from)
                        }
                        if(response.data.status === 400) {
                            setRegisterProcess({ 
                                error: 'Diese Email ist bereits registriert!', 
                                isLoggingIn: false
                            })
                        }
                    } else {
                        setRegisterProcess({ 
                            error: 'Etwas ist schief gelaufen!', 
                            isLoggingIn: false
                        })
                    } 
                } else {
                    setRegisterProcess({ 
                        error: 'Sie haben ihr Passwort nicht richtig bestätigt!', 
                        isLoggingIn: false 
                    })
                }
            } else {
                setRegisterProcess({ 
                    error: 'Bitte geben Sie eine gültige Email Adresse und Passwort ein!', 
                    isLoggingIn: false
                })
            }
        } catch(e) {
            setRegisterProcess({ error: 'Etwas ist schief gelaufen!', isLoggingIn: false })
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
                        <Heading level="2">Registrierung</Heading>
                    </Box>
                </CardHeader>

                <CardBody background="background-front">
                    <Form
                        value={registerData}
                        onChange={val => {
                            setRegisterData(val)
                        }}
                        onSubmit={() => handleRegister()}
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
                            <TextInput name="password" type="password" />
                        </FormField>

                        <FormField label="Passwort bestätigen" name="confirm" required >
                            <TextInput name="confirm" type="password" />
                        </FormField>

                        <FormField label="Nutzername" name="username" required >
                            <TextInput name="username" />
                        </FormField>

                        <Box 
                            fill="horizontal" 
                            direction="row"
                            justify="center"
                            align="center"
                            pad="small"
                        >
                            <Button primary type="submit" label={<Text weight="bold">Registrieren</Text>}/>
                        </Box>
                        {registerProcess.error && (
                            <Box 
                                fill="horizontal" 
                                direction="row"
                                justify="center"
                            >
                                <Text color="status-critical" textAlign="center" >{registerProcess.error}</Text>
                            </Box>
                        )}
                        {registerProcess.isLoggingIn && (
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
                        <Text>Schon registriert?</Text>
                        <Anchor onClick={() => history.push('/login')}>Login</Anchor>
                    </Box>
                </CardFooter>
            </Card>
        </Box>
    )
}

export default Register