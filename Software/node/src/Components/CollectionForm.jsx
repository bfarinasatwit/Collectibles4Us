import React, { useState, useEffect } from 'react'
import {
    Form as BootForm,
    Button as BootButton,
    Modal as BootModal,
    Col as Col,
    Alert as BootAlert
} from 'react-bootstrap'

/**
 * Author: Brodi Farinas 
 * @param {*} props is the album id taken from the homepage location state
 * @returns a form to be used in the carousel which uploads images to apache and the album information into the sql db
 */
const CollectionForm = (props) => {
    //variable initializations and useState set up
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [newAlbumData, setNewAlbumData] = useState({})
    const [image, setImage] = useState(null)
    const [addAlbumError, setAddAlbumError] = useState('')


    //function for both fetch calls, is ran after the form is submitted
    const handleCreate = (event) => {
        event.preventDefault()

        //fetch to put the album data into the sql database
        const addAlbum = async () => {
            try {
                const response = await fetch("http://localhost:3300/index.php/home/newAlbum", {
                    method: "PUT",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        album_name: name,
                        collect_type: type,
                        user_id: props.userData.user_id,
                    }),
                });
                if (!response.ok) {
                    throw new Error("Failed to create new album");
                }
                //gets the response from the fetch which is the new row created in the albums table
                const data = await response.json();
                //logs data just to ts
                console.log(data[0]);
                //sets the album data
                setNewAlbumData(data[0]);
                await addImage(data[0].album_id); // pass in the album ID to addImage
            } catch (error) {
                console.error(error);
            }
        };
        addAlbum()
        //function used to upload the image to the apache server
        const addImage = async (albumId) => {
            try {
                //logs used to check that the data is correct
                console.log(albumId);
                console.log(image)
                //creates a form and appends the key with the data
                const formData = new FormData();
                formData.append('image', image);
                formData.append('album_id', albumId);

                const response = await fetch("http://localhost:3300/index.php/home/uploadAlbumImage", {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }

                const data = await response.json();
                //log the information that was sent from the fetch can be used for trouble shooting
                console.log(data);
                setNewAlbumData({}); // clear new album data after image upload
                //reload page after successful input of image and information
                window.location.reload()
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        }


    }





    return (

        //basic form to display necessary fields
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App" size="lg" aria-labelledby="example-modal-sizes-title-lg">

            <BootModal.Header closeButton className='close-button'>
                <BootModal.Title id="example-modal-sizes-title-lg">
                    Add a New Collection
                </BootModal.Title>
            </BootModal.Header>

            <BootForm style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate} encType="multipart/form-data">

                <BootForm.Group as={Col}>
                    {addAlbumError &&
                        <BootAlert variant='danger' dismissible onClose={setAddAlbumError('')}>
                            This album name has already been used.
                        </BootAlert>}
                </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter a Thumbnail for your Collection
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        type="file"
                        //had issues here make sure that instead of event.target.value it is event.target.files[0]
                        //value returns the path of the image we want the actual information of the file
                        onChange={(event) => setImage(event.target.files[0])}
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
