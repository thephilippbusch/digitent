import React from 'react';
import { Box, Spinner } from 'grommet'

const LoadingScreen = (props) => {
    return (
        <Box
            fill
            direction="row"
            justify="center"
            align="center"
        >
            <Spinner color={props.color ? props.color : 'brand'}/>
        </Box>
    )
}

export default LoadingScreen;