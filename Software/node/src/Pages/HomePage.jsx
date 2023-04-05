import React, { useEffect, useState } from "react";
import CarouselComponent from '../Components/Carousel'
import AlbumEditor from "../Components/AlbumEditor";
import { useLocation } from 'react-router-dom'
import '../Styles/Header.css'
import Collection from "../Components/Collection";

const HomePage = () => {
    const location = useLocation();
    const userId = location.state.user_id

    const [selectedAlbum, setSelectedAlbum] = useState(0)
    const [albumData, setAlbumData] = useState([])

    const changeSelection = (id) => {
        if (id === selectedAlbum) {
            setSelectedAlbum(0)
        } else {
            setSelectedAlbum(id)
        }
    }

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
            {/* This is the header or top row */}
            <div className="Header">
                <h1 style={{ color: 'white', marginRight: 'auto' }}>
                    Collectibles4Us
                </h1>
                <h1 style={{ color: 'white', marginLeft: 'auto' }}>
                    Welcome {location.state.firstName}!
                </h1>
            </div>
            {/* This contains the middle row of the page */}
            <div style={{ "display": "flex", "height": "320px" }}>
                <CarouselComponent
                    albumData={albumData}
                    userData={location.state}
                    selectStateChange={changeSelection} />

                {/* Holds collectible image and actions */}
                <div style={{ "width": "25%" }}>

                </div>
                {/* Holds album image and actions */}
                <div style={{ "width": "25%" }}>
                    {selectedAlbum > 0 && <AlbumEditor id={selectedAlbum} albumData={albumData} />}
                </div>

            </div>
            {/* Bottom of the page, contains the collectibles in the selected collection */}
            <div>
                {selectedAlbum > 0 && <Collection id={selectedAlbum} albumData={albumData} />}
            </div>
        </>
    )
}

export default HomePage;