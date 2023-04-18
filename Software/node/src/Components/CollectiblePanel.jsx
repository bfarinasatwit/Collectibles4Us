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
        
        <div style={{ "width": "185px", "margin-left": "auto","margin-right": "75%", "padding-top": "10px" }}>
           <strong style={{"fontSize": "20px"}}>Selected Collectible</strong>
            <BootCard className="shadow" style={{ "height": "260px", "width": "180px" }}>
                <CollectibleImage id={id} />
                <BootCard.Title style={{ "fontSize": "20px", "margin-top": -12 }} >{collectible.collectible_name}</BootCard.Title>
                <BootCard.Body style={{ "fontSize": "16px", "margin-top": -5, "padding": 0 }}>
                    <strong>Year:</strong> {collectible.year_created}
                    <br></br>
                    <strong>Manufacturer:</strong> {collectible.manufacturer}
                    <br></br>
                    <strong>Condition: </strong>{collectible.c_condition}
                    <br></br>
                    {collectible.graded}
                </BootCard.Body>
            </BootCard>
        </div>
    )
}

export default CollectiblePanel