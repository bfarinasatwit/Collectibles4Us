import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * This component is used to display the ability
 * to add collections to the end user
 * 
 */
const AddCard = ({ onClick }) => {
    return (
        //styling of the card 
        //has on click to show the modal when clicked on
        <Card
            className="shadow"
            onClick={onClick}
            style={{
                cursor: 'pointer',
                width: "270px",
                height: "360px",
                margin: "auto"
            }}
        >
            {/**Image + styling */}
            <Card.Img
                src={require("../pictures/edit.png")}
                style={{
                    height: "50%",
                    objectFit: "contain",
                    objectPosition: "center"
                }}
            />
            <Card.Body style={{ "fontSize": "24px" }}><br></br>Add Collections Here!</Card.Body>
        </Card>
    );
};

export default AddCard;