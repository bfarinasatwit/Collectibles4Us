import React, { useEffect, useState } from "react";
import {
    Card as BootCard,
    Button as BootButton
} from 'react-bootstrap'
import AlbumImage from "./AlbumImage";
import AlbumEditForm from "./AlbumEditForm";

const AlbumEditor = ({ albumData, id, handleRemoveAlbum }) => {

    const [showEdit, setShowEdit] = useState(false)
    const [album, setAlbum] = useState({})

    // this sets the album to the one selected out of all the albums in the list
    useEffect(() => {
        setAlbum(
            albumData.find(obj => obj.album_id == id)
        )
    }, [id])
    

    return (
        <>
            <div></div>
            <div style={{ "width": "180px", "margin-left": "75%","margin-right": "auto", "padding-top": "10px"}}>
            <strong style={{"fontSize": "20px"}}>Selected Collection</strong>
                <BootCard className="shadow" style={{ "height": "260px" }}>
                    <AlbumImage id={id} />
                    <BootCard.Title style={{ "fontSize": "24px" }}><strong>{album.album_name}</strong></BootCard.Title>
                    <BootCard.Body className='type' style={{ "fontSize": "18px", "padding": "0px" }}><strong>Collection Type:</strong><br></br>{album.collect_type}</BootCard.Body>
                </BootCard>
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                    {/**remove album is inside of HomePage.jsx */}
                    <BootButton variant="dark" onClick={() => handleRemoveAlbum(id)} style={{ "margin": "8px", "fontSize": "12px" }}>
                        Remove
                    </BootButton>
                    <BootButton onClick={() => setShowEdit(true)} variant="dark" style={{ "margin": "8px", "fontSize": "12px" }}>
                        Edit
                    </BootButton>
                </div>
            </div>
            <AlbumEditForm album={album} show={showEdit} handleHide={() => setShowEdit(false)} />
        </>
    )

}

export default AlbumEditor