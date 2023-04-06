import React, { useEffect, useState } from "react";
import {
    Card as BootCard,
    Button as BootButton
} from 'react-bootstrap'
import AlbumImage from "./AlbumImage";
import AlbumEditForm from "./AlbumEditForm";

const AlbumEditor = (props) => {

    const [showEdit, setShowEdit] = useState(false)
    const [album, setAlbum] = useState({})

    // this sets the album to the one selected out of all the albums in the list
    useEffect(() => {
        setAlbum(
            props.albumData.find(obj => obj.album_id == props.id)
        )
    }, [props.id])

    return (
        <>
            <div style={{ "width": "160px", "margin": "auto", "paddingTop": "20px" }}>
                <div className="shadow card" style={{ "height": "240px" }}>
                    <AlbumImage id={props.id} />
                    <BootCard.Title style={{ "fontSize": "16px" }}>{album.album_name}</BootCard.Title>
                    <BootCard.Body className='type' style={{ "fontSize": "16px", "padding": "10px" }}>{album.collect_type}</BootCard.Body>
                </div>
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                    <BootButton variant="dark" style={{ "margin": "8px", "fontSize": "12px" }}>
                        Remove
                    </BootButton>
                    <BootButton onClick={() => setShowEdit(true)} variant="dark" style={{ "margin": "8px", "fontSize": "12px" }}>
                        Edit
                    </BootButton>
                </div>
            </div>
            <AlbumEditForm album={album} show={showEdit} handleHide={() => setShowEdit(false)}/>
        </>
    )

}

export default AlbumEditor