import React from 'react';
import styled from 'styled-components';

import Spinner from './spinner';

const Loader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingScreen = () => {
    return (
        <Loader>
            <Spinner />
        </Loader>
    )
}

export default LoadingScreen;