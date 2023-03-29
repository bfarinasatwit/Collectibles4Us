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
                width: "180px",
                height: "240px",
                margin: "auto"
            }}
        >
            {/**Image + styling */}
            <Card.Img
                src={require("../pictures/edit.png")}
                style={{
                    height: "60%",
                    objectFit: "contain",
                    objectPosition: "center"
                }}
            />
            <Card.Title>Add Collections Here!</Card.Title>
        </Card>
    );
};

export default AddCard;