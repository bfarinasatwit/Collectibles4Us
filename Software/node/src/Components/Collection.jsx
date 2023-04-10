import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import "../Styles/CollectibleGrid.css"
import CollectibleForm from "./CollectibleForm"
import AddCollectible from "./AddCollectible";

const Collection = ({ id, albumData, selectStateChange }) => {
    const [album, setAlbum] = useState({})
    const [isCollection, setIsCollection] = useState(false)
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleHide = () => {
        setShow(false);
    }

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
                        style={{ padding: "10px", margin: "20px", width: "150px", cursor: 'pointer', }}>

                        <Card.Title>{collectible.collectible_name}</Card.Title>
                        <Card.Body>
                            {"Year Created: " + collectible.year_created}<br></br>
                            {collectible.graded}<br></br>
                            {"Condition: " + collectible.c_condition}
                        </Card.Body>
                    </Card>
                )
            )}
            <AddCollectible onClick={handleShow} />
            <CollectibleForm showModal={show} albumData={album} onEsc={handleHide} />
        </div>
    )
}

export default Collection