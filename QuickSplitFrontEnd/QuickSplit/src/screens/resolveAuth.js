import React, {useEffect, useContext} from 'react';
import {Context as authContext} from '../Context/authContext';


const ResolveAuthScreen = () => {
    const {trySignin} = useContext(authContext);

    useEffect(() => {
        trySignin();
    }, []);

    return null;
};

export default ResolveAuthScreen;
