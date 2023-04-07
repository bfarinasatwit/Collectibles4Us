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
    const [validated, setValidated] = useState(false)
    const [imageName, setImageName] = useState('')
    const [addImageError, setImageError] = useState("Please Enter a File")
    const [typeError, setTypeError] = useState("Please enter an album Name")
    const [nameError, setNameError] = useState("Please enter an album type")


    function checkValidity(){
        if (!((imageName.substring(imageName.length -4).toLowerCase().includes(".png")) || imageName.substring(imageName.length - 4).toLowerCase().includes(".jpg"))){
            console.log("please enter a valid file type")
            setImageError("Please enter a .jpg or .png image");
            setValidated(false)
            return;

        }

        if (!(!!name)){
            console.log("Missing album name")
            setNameError("Please enter an album name")
            setValidated(false)
            return
        }
        if (!(!!type)){
            console.log("Missing album type")
            setTypeError("Please enter an album type")
            setValidated(false)
            return
        }
        setValidated(true)

    }

    //function for both fetch calls, is ran after the form is submitted
    const handleCreate = (event) => {
        event.preventDefault()
       

        checkValidity()
        if (validated == true){
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
                    setAddAlbumError("That album name has already been used")
                    throw new Error("That album name has already been used")
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


    }





    return (

        //basic form to display necessary fields
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App" size="lg" aria-labelledby="example-modal-sizes-title-lg">

            <BootModal.Header closeButton className='close-button'>
                <BootModal.Title id="example-modal-sizes-title-lg">
                    Add a New Collection
                </BootModal.Title>
            </BootModal.Header>

            <BootForm noValidate style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate} encType="multipart/form-data">
                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter a Thumbnail for your Collection
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        type="file"
                        //had issues here make sure that instead of event.target.value it is event.target.files[0]
                        //value returns the path of the image we want the actual information of the file
                        onInput={(event) => {console.log(!(imageName.substring(imageName.lastIndexOf(".")+1)));if (event.target.files[0]) {setImage(event.target.files[0]);  setImageName(event.target.files[0].name); checkValidity()}}}
                        isInvalid = {!((imageName.substring(imageName.length -4).toLowerCase().includes(".png")) || imageName.substring(imageName.length - 4).toLowerCase().includes(".jpg"))}
                    />
                    <BootForm.Control.Feedback type = "invalid" style = {{"margin-bottom": "10px"}}>
                        {addImageError}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col} style = {{"margin-bottom": "10px"}}>
                    <BootForm.Label>
                        Enter Collection Name
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Collection Name"
                        onChange={(event) => {setName(event.target.value)}}
                        isInvalid = {!(!!name)}
                    />
                    <BootForm.Control.Feedback type="invalid">
                        {nameError}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col} style = {{"margin-bottom": "10px"}}>
                    <BootForm.Label>
                        Enter Collection Type
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Collection Type"
                        onChange={(event) => {setType(event.target.value)}}
                        isInvalid = {!(!!type)}
                    />
                    <BootForm.Control.Feedback type="invalid">
                        {typeError}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootButton className="form-control" variant="dark" style={{ "marginTop": "0.5rem", "marginBottom": "6rem" }} type="submit"  >
                    Submit
                </BootButton>
            </BootForm>
        </BootModal>
    )
}
export default CollectionForm; 