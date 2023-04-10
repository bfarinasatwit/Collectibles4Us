import React, { useEffect, useState } from "react";
import CollectibleImage from './CollectibleImage'
import { Card as BootCard } from 'react-bootstrap'

const CollectiblePanel = ({ id, albumId, albumData }) => {

    const [collectible, setCollectible] = useState({})

    useEffect(()=> {
        const album = albumData.find(obj => obj.album_id === albumId)
        setCollectible(album.collectibles.find(obj => obj.collectible_id === id))
    }, [id])

    return (
        <div style={{ "width": "160px", "margin": "auto", "paddingTop": "20px" }}>
            <BootCard style={{ "height": "240px" }}>
                <CollectibleImage id={id}/>
                <BootCard.Title>{collectible.collectible_name}</BootCard.Title>
                <BootCard.Body>
                    Year: {collectible.year_created}
                    <br></br>
                    Manufacturer: {collectible.manufacturer}
                    <br></br>
                    Grade: {collectible.graded}
                </BootCard.Body>
            </BootCard>
        </div>
    )
}

export default CollectiblePanel