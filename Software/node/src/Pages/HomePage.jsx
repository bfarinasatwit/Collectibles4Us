import React from "react";
import CarouselComponent from '../Components/carousel'
import { useLocation } from 'react-router-dom'
import '../Styles/Header.css'
const HomePage = () => {
    const location = useLocation();
    const userId = location.state.user_id;
    return (
        <>
            <div className="Header">

                <h1>
                    Collectibles4Us
                </h1>

            </div>
            <CarouselComponent id={userId}/>

        </>
    )
}

export default HomePage;