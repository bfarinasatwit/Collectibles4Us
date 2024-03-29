import React, { useEffect, useState } from "react";
import {
    Modal as BootModal,
    Form as BootForm,
    Button as BootButton
} from 'react-bootstrap'

const AlbumEditForm = ({ album, show, handleHide }) => {
    const [isAlbum, setIsAlbum] = useState(false)
    const [name, setName] = useState('')
    const [type, setType] = useState('')

    // Jon, see if you can get an error here where it says
    // 'album_id' is not able to be accessed on an undefined 'album'
    useEffect(() => {
        if (album.album_id) {
            setIsAlbum(true)
        } else {
            setIsAlbum(false)
        }
    }, [album])

    const handleApply = (event) => {
        event.preventDefault()
        // if the fields have not been changed
        if (album.collect_type === '' && album.album_name === '') {
            
        // if the fields have been changed, but still match the original value
        } else if (album.collect_type === type && album.album_name === name) {

        // else 
        } else {

        }
    }

    return (
        <>
            {isAlbum && <BootModal show={show} onHide={handleHide} backdrop='static'>
                <BootModal.Header closeButton className='close-button'>Edit Album</BootModal.Header>
                <BootForm style={{ width: "60%", margin: "auto" }} onSubmit={handleApply}>
                    <BootForm.Label className="form-control" style={{ marginTop: "1rem" }} >
                        Album Name
                    </BootForm.Label>

                    <BootForm.Control defaultValue={album.album_name} onChange={(event) => setName(event.target.value)} />

                    <BootForm.Label className="form-control" style={{ marginTop: "1rem" }}>
                        Collection Type
                    </BootForm.Label>

                    <BootForm.Control defaultValue={album.collect_type} onChange={(event) => setType(event.target.value)} />

                    <BootButton type="submit" variant='dark' style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
                        Apply
                    </BootButton>
                </BootForm>
            </BootModal>}
        </>
    )
}

export default AlbumEditForm