import React, { useState, useEffect } from 'react'
import {
    CloseButton as BootClose,
    Form as BootForm,
    Button as BootButton,
    Modal as BootModal,
    Col as Col,
} from 'react-bootstrap'


const CollectionForm = (props) => {

    

    const [album_name, setName] = useState('')
    const [type, setType] = useState('')
    const [data, setData] = useState({})
    const [image, setImage] = useState(null)

    const handleCreate = (event) => {
        event.preventDefault()
       console.log(album_name)
       console.log(type)
       console.log(props.id)
        fetch("http://localhost:3300/index.php/home/newAlbum",
            {
                method: 'PUT',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    album_name: album_name,
                    collect_type: type,
                    user_id: props.id
                })
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data)
                //message that collection was succesfully entered
            }).catch(error => console.error(error))

            const formData = new FormData();
            formData.append('image', image)
            formData.append('albumId', data.albumId)
        fetch("http://localhost:3300/index.php/home/uploadAlbumImage",
            {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: formData
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.error(error)
            })
    }


    return (
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App" size="lg" aria-labelledby="example-modal-sizes-title-lg">

            <BootModal.Header closeButton className='close-button'>
                <BootModal.Title id="example-modal-sizes-title-lg">
                    Add a New Collection
                </BootModal.Title>
            </BootModal.Header>

            <BootForm style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate}>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter a Thumbnail for your Collection
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        type = "file"
                        onChange={(event) => setImage(event.target.value)}
                    />
                </BootForm.Group>


                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter Collection Name
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Collection Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <BootForm.Control.Feedback type="invalid" />
                </BootForm.Group>
                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter Collection Type
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Collection Type"
                        onChange={(event) => setType(event.target.value)}
                    />
                    <BootForm.Control.Feedback type="invalid" />
                </BootForm.Group>





                <BootButton className="form-control" variant="dark" style={{ "marginTop": "0.5rem", "marginBottom": "6rem" }} type="submit"  >
                    Submit
                </BootButton>
            </BootForm>


        </BootModal>






    )



}
export default CollectionForm;