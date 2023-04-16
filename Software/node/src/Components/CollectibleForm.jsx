import React, { useState } from 'react'
import {
    Form as BootForm,
    Button as BootButton,
    Modal as BootModal,
    Col as Col,
    Alert as BootAlert
} from 'react-bootstrap'

/**
 * Author: Brodi Farinas 
 * @param {*} props contains albumData showModal and onEsc
 * @returns a form to be used in the carousel which uploads images to apache and the album information into the sql db
 */
const CollectibleForm = (props) => {
    //variable initializations and useState set up
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [year, setYear] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [condition, setCondition] = useState("0")
    const [grade, setGrade] = useState("Not Graded")
    const [validated, setValidated] = useState(false)
    const [addImageError, setImageError] = useState('Please Upload an Image')
    const [imageName, setImageName] = useState('')
    function checkValidity(){
        if (!imageName.substring(imageName.length - 4).toLowerCase().includes(".jpg")){
            setImageError("Invalid file type, please upload a .jpg")
            console.log("invalid image")
            setValidated(false)
            return
        }
        if (!(!!name)){
            console.log("invalid name")

            setValidated(false)
            return
        }
        if (!(!!manufacturer)){
            console.log("invalid manu")

            setValidated(false)
            return
        }
        if (!/[0-9]{4}/.test(year)){
            console.log("invalid year")

            setValidated(false)
            return
        }

        setValidated(true)

    }

    //function for both fetch calls, is ran after the form is submitted
    const handleCreate = (event) => {
        event.preventDefault()


        checkValidity()
        if (validated){
        //***fetch to put the Collectible data into the sql database
        const addCollectible = async () => {
            try {
                const response = await fetch("http://localhost:3300/index.php/home/newCollectible", {
                    method: "PUT",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        collectible_name: name,
                        year: year,
                        manufacturer: manufacturer,
                        condition: condition,
                        grade: grade,
                        album_id: props.albumData.album_id,
                    }),
                });
                //gets the response from the fetch which is the new row created in the albums table
                const data = await response.json();
                //logs data just to ts
                console.log(data[0]);
                //sets the album data

                await addImage(data[0].collectible_id); // pass in the album ID to addImage
            } catch (error) {
                console.error(error);
            }
        };
        addCollectible()
        //function used to upload the image to the apache server
        const addImage = async (collectibleId) => {
            try {
                //logs used to check that the data is correct
                console.log(collectibleId);
                console.log(image)
                //creates a form and appends the key with the data
                const formData = new FormData();
                formData.append('image', image);
                //THIS IS GOING TO HAVE TO BE THE COLLECTIBLE ID
                formData.append('collectible_id', collectibleId);
                const response = await fetch("http://localhost:3300/index.php/home/uploadCollectibleImage", {
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
        //NEED TO CHECK TO MAKE SURE THIS ALL WORKS AS INTENDED
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App" size="lg" aria-labelledby="example-modal-sizes-title-lg">

            <BootModal.Header closeButton className='close-button'>
                <BootModal.Title id="example-modal-sizes-title-lg">
                    Add a New Collectible
                </BootModal.Title>
            </BootModal.Header>

            <BootForm style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate} encType="multipart/form-data">
                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter a Photo of Your Collectible
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        type="file"
                        accept = ".jpg"
                        //had issues here make sure that instead of event.target.value it is event.target.files[0]
                        //value returns the path of the image we want the actual information of the file
                        onChange={(event) => {if (event.target.files[0]) {setImage(event.target.files[0]);  setImageName(event.target.files[0].name); checkValidity()}}}
                        isInvalid = {!(imageName.substring(imageName.length - 4).toLowerCase().includes(".jpg"))}
                    />
                    <BootForm.Control.Feedback type = "invalid" style = {{"margin-bottom": "10px"}}>
                        {addImageError}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter the Name of the Collectible
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Collectible Name"
                        onChange={(event) => setName(event.target.value)}
                        isInvalid = {!(!!name)}
                    />
                    <BootForm.Control.Feedback type="invalid">
                        Please Enter a Collection Name
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter the year the collectible was produced
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="YYYY"
                        onChange={(event) => setYear(event.target.value)}
                        isInvalid = {!/[0-9]{4}/.test(year)}
                    />
                    <BootForm.Control.Feedback type="invalid">
                        Please Enter a Valid Year
                    </BootForm.Control.Feedback>             
                    </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter the Manufacturer of the Collectible
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Manufacturer"
                        onChange={(event) => setManufacturer(event.target.value)}
                        isInvalid = {!(!!manufacturer.length)}
                    />
                    <BootForm.Control.Feedback type="invalid">
                        Please Enter a Manufacturer
                    </BootForm.Control.Feedback>   
                    
                </BootForm.Group>


                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Select a Condition for Your Collectible
                    </BootForm.Label>
                    <BootForm.Select
                        onChange={(event) => setCondition(event.target.value)}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </BootForm.Select>
                </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Select if Your Collectible is Graded
                    </BootForm.Label>
                    <BootForm.Select
                        onChange={(event) => setGrade(event.target.value)}
                    >
                        <option value="Graded">Graded</option>
                        <option value="Not Graded">Not Graded</option>
                    </BootForm.Select>
                </BootForm.Group>
                <BootButton className="form-control" variant="dark" style={{ "marginTop": "0.5rem", "marginBottom": "6rem" }} type="submit"  >
                    Submit
                </BootButton>
            </BootForm>
        </BootModal>
    )
}
export default CollectibleForm;