import React, { useEffect, useState } from "react";
import CarouselComponent from '../Components/Carousel'
import AlbumPanel from "../Components/AlbumPanel";
import { useLocation } from 'react-router-dom'
import '../Styles/Header.css'
import Collection from "../Components/Collection";
import CollectiblePanel from "../Components/CollectiblePanel";

const HomePage = () => {
    const location = useLocation();
    const userId = location.state.user_id

    const [selectedCollectible, setSelectedCollectible] = useState(0)
    const [selectedAlbum, setSelectedAlbum] = useState(0)
    const [albumData, setAlbumData] = useState([])

    const changeAlbumSelection = (id) => {
        if (id === selectedAlbum) {
            setSelectedAlbum(0)
        } else {
            setSelectedAlbum(id)
        }
    }

    const changeCollectibleSelection = (id) => {
        if (id === selectedCollectible) {
            setSelectedCollectible(0)
        } else {
            setSelectedCollectible(id)
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
                    selectStateChange={changeAlbumSelection} />

                {/* Holds collectible image and actions */}
                <div style={{ "width": "25%" }}>
                    {selectedCollectible > 0 && <CollectiblePanel
                        id={selectedCollectible}
                        albumId={selectedAlbum}
                        albumData={albumData}
                    />}
                </div>
                {/* Holds album image and actions */}
                <div style={{ "width": "25%" }}>
                    {selectedAlbum > 0 && <AlbumPanel
                        id={selectedAlbum}
                        albumData={albumData} />}
                </div>

            </div>
            {/* Bottom of the page, contains the collectibles in the selected collection */}
            <div>
                {selectedAlbum > 0 && <Collection
                    id={selectedAlbum}
                    albumData={albumData}
                    selectStateChange={changeCollectibleSelection} />}
            </div>
        </>
    )
}

export default HomePage;