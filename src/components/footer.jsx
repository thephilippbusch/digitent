import React from 'react'

import { Anchor, Box, Text } from 'grommet'
import { Github, PiedPiper } from 'grommet-icons'

const Footer = () => {


    return (
        <Box 
            fill="horizontal" 
            height="3vh"
            direction="row"
            justify="between"
            align="center"
            pad={{horizontal: "small"}}
            background="brand"
        >
            <Box direction="row" gap="small" align="center">
                <Text textAlign="center">v0.0.1</Text>
                <PiedPiper />
            </Box>

            <Box direction="row" gap="small" align="center">
                <Github />
                <Anchor 
                    textAlign="center" 
                    decoration="none"
                    color="text"
                    href="https://github.com/thephilippbusch/digitent-react"
                >
                    GitHub
                </Anchor>
            </Box>
        </Box>
    )
}

export default Footer