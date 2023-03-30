import React, { useEffect, useState } from "react";
import CarouselComponent from '../Components/carousel'
import { useLocation } from 'react-router-dom'
import '../Styles/Header.css'

const HomePage = () => {
    const location = useLocation();
    const userId = location.state.user_id

    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        const loadPage = async () => {
            const response = await fetch('http://localhost:3300/index.php/home/getProfile?user_id=' + userId,
                {
                    method: 'GET',
                    mode: 'cors',
                }
            )
            const data = await response.json()
            setAlbumData(data)
        }
        loadPage()
    }, [])

    return (
        <>
            <div className="Header">
                <h1 style={{color:'black', marginRight: 'auto'}}>
                    Collectibles4Us
                </h1>
                <h1 style={{color:'black', marginLeft: 'auto'}}>
                    Welcome {location.state.firstName}!
                </h1>
            </div>
            <div style={{"display": "flex"}}>
                <CarouselComponent albumData={albumData} userData={location.state} />
                <div style={{"width": "40%"}}>
                    
                </div>
            </div>
        </>
    )
}

export default HomePage;