import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../Styles/carousel.css'
import Card from 'react-bootstrap/Card'
import AddCard from './AddCard'




const CarouselComponent = (props) => {

    //logs the id number in the console for troubleshooting
    { console.log(props.id) }
    //empty array for data to be filled with 
    const [data, setdata] = useState([])
    //useEffect is ran on page load
    useEffect(() => {
        //fetching from controller with method GET
        fetch('http://localhost:3300/index.php/home/getProfile?user_id=' + props.id,
            {
                method: 'GET',
                mode: 'cors',
            }
        ).then(response => response.json())
            //setting data
            .then(data => {
                setdata(data)
            })
            .catch(error => console.error(error))
    }, []);


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


    //add collection modal
    const handleShowModal = () =>{

    }
    return (

        <div>

            <Carousel
                showDots={false} //removes the dots underneath the carousel
                responsive={responsive} //getting the responsive function from above
                ssr={true} // means to render carousel on server-side.
                infinite={true} //wraps around
                keyBoardControl={true}
                customTransition="all .5"
                focusOnSelect={true}
                transitionDuration={500}
                partialVisible={true} //shows partial visible items in the carousel
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
            >
                {/**Logging data for TS */}
                {console.log(data)}

                {/**Mapping data*/}
                {data.map(album => {
                    {/**Creation of each div happens here*/ }
                    return <Card
                        className='shadow'
                        style={{
                            width: "308px",
                            height: "400px",
                            margin: "20px"

                        }}
                    >

                        {/**Not important just used for TS */}
                        {console.log(album.album_name)}
                        {/**Image for each div, require is needed to "import" the file */}
                        <Card.Img
                            src={require("../media/" + album.album_thumbnail)}
                            style={{
                                height: "75%",
                                objectFit: "cover",
                                objectPosition: "center"
                            }}
                        />
                        <Card.Title>{album.album_name}</Card.Title>
                        <Card.Body className='type'>{album.collect_type}</Card.Body>
                    </Card>

                })}

                {/**I want to create a div that goes into the carousel to add collections
                 * My ides is to sort of have three collections on the screen at all times 
                 * if there is less than three fill in the rest with dummy templates that 
                 * you can click on to create a new collection
                */}
                
                <AddCard showModal={handleShowModal}/>
            </Carousel>

        </div>
    )
}


export default CarouselComponent;