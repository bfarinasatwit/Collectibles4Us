import React from "react";
import CarouselComponent from '../Components/carousel'
import { useLocation } from 'react-router-dom'
const HomePage = () => {
    const location = useLocation();
    const userId = location.state.user_id;
    return (
        <>
            <CarouselComponent id={userId}/>

        </>
    )
}

export default HomePage;