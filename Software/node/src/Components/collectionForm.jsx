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
    const [newAlbumData, setNewAlbumData] = useState([])
    const [image, setImage] = useState(null)

    const handleCreate = (event) => {
        event.preventDefault()

        const addAlbum = async () => {
            const response = await fetch("http://localhost:3300/index.php/home/newAlbum",
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        album_name: album_name,
                        collect_type: type,
                        user_id: props.id
                    })
                })
            const data = await response.json()

            setNewAlbumData(data)

            console.log(data)
        }

        const addImage = async () => {
            const formData = new FormData();
            formData.append('image', image)
            formData.append('album_id', newAlbumData[0].album_id)

            const response = await fetch("http://localhost:3300/index.php/home/uploadAlbumImage",
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    body: formData
                }
            )
            const data = await response.json()
            console.log(data)
        }
        addAlbum()
        addImage()
    }


    return (
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App" size="lg" aria-labelledby="example-modal-sizes-title-lg">

            <BootModal.Header closeButton className='close-button'>
                <BootModal.Title id="example-modal-sizes-title-lg">
                    Add a New Collection
                </BootModal.Title>
            </BootModal.Header>

            <BootForm style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate} encType="multipart/form-data">

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter a Thumbnail for your Collection
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        type="file"
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
