import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../Styles/carousel.css'
import Card from 'react-bootstrap/Card'
import AddCard from './AddCard'
import CollectionForm from './CollectionForm'
import AlbumImage from './AlbumImage'

const CarouselComponent = ({ albumData, userData, selectStateChange }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleHide = () => {
        setShow(false);
    }

    //customizing the carousel only worry about desktop for now
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4, //how many items displayed at once
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
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
                focusOnSelect={false}
                arrows={true}
                renderDotsOutside={true}
                transitionDuration={500}
                draggable={false}
                partialVisible={true} //shows partial visible items in the carousel
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
            >
                {/**Mapping data*/}
                {albumData.map(album => {
                    {/**Creation of each div happens here*/ }
                    return <Card
                        onClick={() => selectStateChange(album.album_id)}
                        className='shadow'
                        style={{
                            width: "270px",
                            height: "360px",
                            margin: "auto"
                        }}
                    >
                        {/**Not important just used for TS */}
                        {/* {console.log(album.album_id)} */}
                        {/**Image for each div: see AlbumImage */}
                        <AlbumImage id={album.album_id} />
                        <Card.Title style={{ "fontSize": "32px" }}><strong>{album.album_name}</strong></Card.Title>
                        <Card.Body className='type' style={{ "fontSize": "20px", "padding": "10px" }}>
                            <strong>Collection Type:</strong><br></br> {album.collect_type}</Card.Body>
                    </Card>
                })}

                {/**I want to create a div that goes into the carousel to add collections
                 * My ides is to sort of have three collections on the screen at all times 
                 * if there is less than three fill in the rest with dummy templates that 
                 * you can click on to create a new collection
                 * 
                 * Edit: Changed it to a different component so it would be easier to show the modal
                */}

                <AddCard className="add-card" onClick={handleShow} />
            </Carousel>

            <CollectionForm showModal={show} onEsc={handleHide} userData={userData} />
        </>
    )
}

export default CarouselComponent;
