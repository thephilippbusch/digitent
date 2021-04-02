import React, { useState } from 'react'
import { Grommet, Main as MainBox } from 'grommet'
import { globalGrommetTheme } from './styles/globalTheme'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import { AuthContext, CurrentUser } from './auth/auth'
import { ThemeContext } from './styles/themeContext'

import PrivateRoute from './auth/privateRoute'

// import public components
import Login from './pages/login'
import Register from './pages/register'

// import private components
import LoadProfile from './loader/loadProfile'
import LoadHome from './loader/loadHome'
import Footer from './components/footer'


const Main = () => {
    const [currentTheme, setCurrentTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    )

    const existingAuthToken = localStorage.getItem('authToken')
    const existingUserToken = localStorage.getItem('userToken')
    const [authToken, setAuthToken] = useState(existingAuthToken)
    const [currentUser, setCurrentUser] = useState(existingUserToken)

    const setToken = (data) => {
        localStorage.setItem('authToken', data)
        setAuthToken(data)
    }

    const setUser = (data) => {
        localStorage.setItem('userToken', data)
        setCurrentUser(data)
    }

    const setTheme = (data) => {
        localStorage.setItem('theme', data)
        setCurrentTheme(data)
    }

    return(
        <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
            <Grommet theme={globalGrommetTheme} themeMode={currentTheme}>
                <Router>
                    <Switch>
                        <CurrentUser.Provider value={{ currentUser, setCurrentUser: setUser }}>
                            <MainBox fill="horizontal" height="97vh" background="background-back">
                                {/* Public Routes */}
                                <Route path="/login"><Login /></Route>
                                <Route path="/register"><Register /></Route>

                                {/* Non-Public Routes -> Authentication required */}
                                <ThemeContext.Provider value={{ currentTheme, setCurrentTheme: setTheme }}>
                                    <PrivateRoute 
                                        path="/profile" 
                                        component={LoadProfile} 
                                    />
                                </ThemeContext.Provider>
                                <PrivateRoute exact path="/" component={LoadHome} randomNumb={4}/>
                            </MainBox>
                        </CurrentUser.Provider>
                    </Switch>

                    <Footer />
                </Router>
            </Grommet>
        </AuthContext.Provider>
    )
}

export default Main;