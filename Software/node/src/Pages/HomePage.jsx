import React from "react";
import Carousel from '../Components/carousel'
import { Button as BootButton} from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
const HomePage = () => {
    const location = useLocation();
    const userId = location.state.user_id;
    return (
        <>
            <Carousel/>

        </>
    )
}

export default HomePage;