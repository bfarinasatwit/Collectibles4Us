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
 * @param {*} props contains the album
 * @returns a form to be used in the carousel which uploads images to apache and the album information into the sql db
 */
const CollectibleForm = (props) => {
    //variable initializations and useState set up
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [year, setYear] = useState(-1)
    const [manufacturer, setManufacturer] = useState('')
    const [condition, setCondition] = useState(-1)
    const [grade, setGrade] = useState(-1)
    const [addCollectibleError, setAddCollectibleError] = useState('')


    //function for both fetch calls, is ran after the form is submitted
    const handleCreate = (event) => {
        event.preventDefault()

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





    return (

        //basic form to display necessary fields
        //NEED TO CHECK TO MAKE SURE THIS ALL WORKS AS INTENDED
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App" size="lg" aria-labelledby="example-modal-sizes-title-lg">

            <BootModal.Header closeButton className='close-button'>
                <BootModal.Title id="example-modal-sizes-title-lg">
                    Add a New Collection
                </BootModal.Title>
            </BootModal.Header>

            <BootForm style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate} encType="multipart/form-data">

                <BootForm.Group as={Col}>
                    {addCollectibleError &&
                        <BootAlert variant='danger' dismissible onClose={setAddCollectibleError('')}>
                            This album name has already been used.
                        </BootAlert>}
                </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter a Photo of Your Collectible
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
                        Enter the Name of the Collectible
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Collectible Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <BootForm.Control.Feedback type="invalid" />
                </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter the year the collectible was produced
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="YYYY"
                        onChange={(event) => setYear(event.target.value)}
                    />
                    <BootForm.Control.Feedback type="invalid" />
                </BootForm.Group>

                <BootForm.Group as={Col}>
                    <BootForm.Label>
                        Enter the Manufacturer of the Collectible
                    </BootForm.Label>
                    <BootForm.Control
                        required
                        placeholder="Manufacturer"
                        onChange={(event) => setManufacturer(event.target.value)}
                    />
                    <BootForm.Control.Feedback type="invalid" />
                </BootForm.Group>


                <BootForm.Group as ={Col}>
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