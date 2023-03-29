import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../Styles/carousel.css'
import Card from 'react-bootstrap/Card'
import AddCard from './AddCard'
import { Modal } from 'react-bootstrap'
import AlbumImage from './AlbumImage'

const CarouselComponent = ({ uData }) => {
    console.log(uData)
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    //customizing the carousel only worry about desktop for now
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, //how many items displayed at once
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <>
            <Carousel
                showDots={false} //removes the dots underneath the carousel
                responsive={responsive} //getting the responsive function from above
                ssr={true} // means to render carousel on server-side.
                infinite={true} //wraps around
                keyBoardControl={true}
                customTransition="all .5"
                focusOnSelect={false}
                transitionDuration={500}
                partialVisible={true} //shows partial visible items in the carousel
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
            >
                {/**Mapping data*/}
                {uData.map(album => {
                    {/**Creation of each div happens here*/ }
                    return <Card
                        className='shadow'
                        style={{
                            width: "200px",
                            height: "300px",
                            margin: "auto"

                        }}
                    >

                        {/**Not important just used for TS */}
                        {console.log(album.album_image_id)}
                        {/**Image for each div, require is needed to "import" the file */}
                        <AlbumImage id = {album.album_image_id}
                        />
                        <Card.Title>{album.album_name}</Card.Title>
                        <Card.Body className='type'>{album.collect_type}</Card.Body>
                    </Card>
                })}

                {/**I want to create a div that goes into the carousel to add collections
                 * My ides is to sort of have three collections on the screen at all times 
                 * if there is less than three fill in the rest with dummy templates that 
                 * you can click on to create a new collection
                 * 
                 * Edit: Changed it to a different component so it would be easier to show the modal
                */}

                <AddCard className="add-card" onClick={handleShowModal} />
            </Carousel>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* your form code here */}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCloseModal}>Cancel</button>
                    <button>Add Collection</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CarouselComponent;