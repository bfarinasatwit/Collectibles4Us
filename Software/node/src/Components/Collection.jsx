import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import "../Styles/CollectibleGrid.css"

const Collection = ({ id, albumData }) => {
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
            }
        }
    }, [album])

    return (
        <div className="collectible-grid">
            {/* {collectibleDivs} */}
        </div>
    )
}

export default Collection