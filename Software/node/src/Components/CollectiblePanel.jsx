import React, { useEffect, useState } from "react";
import CollectibleImage from './CollectibleImage'
import { Card as BootCard } from 'react-bootstrap'

const CollectiblePanel = ({ id, albumId, albumData }) => {

    const [collectible, setCollectible] = useState({})

    useEffect(() => {
        const album = albumData.find(obj => obj.album_id === albumId)
        setCollectible(album.collectibles.find(obj => obj.collectible_id === id))
    }, [id])

    return (
        <div style={{ "display": "flex", "width": "200px", "margin": "auto", "paddingTop": "20px" }}>
            <BootCard style={{ "height": "240px", "width": "240px" }}>
                <CollectibleImage id={id} />
                <BootCard.Title style={{ "fontSize": "16px", "margin-top": 0 }} >{collectible.collectible_name}</BootCard.Title>
                <BootCard.Body style={{ "fontSize": "16px", "padding": 0 }}>
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