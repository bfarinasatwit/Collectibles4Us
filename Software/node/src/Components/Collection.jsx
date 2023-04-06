import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import "../Styles/CollectibleGrid.css"

const Collection = ({ id, albumData, selectStateChange }) => {
    const [album, setAlbum] = useState({})
    const [isCollection, setIsCollection] = useState(false)

    useEffect(() => {
        setAlbum(
            albumData.find(obj => obj.album_id == id)
        )
    }, [id])

    useEffect(() => {
        if (album.collectibles) {
            if (album.collectibles.length) {
                setIsCollection(true)
            } else {
                setIsCollection(false)
            }
        } else {
            setIsCollection(false)
        }
    }, [album])

    return (
        <div className="collectible-grid">
            {isCollection && album.collectibles.map(
                collectible => (
                    <Card
                        onClick={() => selectStateChange(collectible.collectible_id)}
                        className="shadow"
                        style={{ padding: "10px", margin: "20px" }}>

                        <Card.Title>{collectible.collectible_name}</Card.Title>
                    </Card>
                )
            )}
        </div>
    )
}

export default Collection