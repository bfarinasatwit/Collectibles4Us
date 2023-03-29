import React from "react";
import Card from 'react-bootstrap/Card'

const Collection = ({ uData, albumId }) => {
    uData.map(album => {
        if (album.album_id == albumId) {
            album.collectibles.map(
                collectible => {
                    return <Card className="shadow"
                        style={{
                            width: "180px",
                            height: "240px",
                            margin: "auto"

                        }} >
                        <Card.Title>{collectible.collectible_name}</Card.Title>
                        <Card.Body className='type'>{album.collect_type}</Card.Body>
                    </Card>
                }
            )
        }
    })
}

export default Collection