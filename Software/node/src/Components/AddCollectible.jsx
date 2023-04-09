import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * This component is used to display the ability
 * to add collections to the end user
 * 
 */
const AddCollectible = ({ onClick }) => {
    return (
        //styling of the card 
        //has on click to show the modal when clicked on
        <Card
            className="shadow"
            onClick={onClick}
            style={{
                cursor: 'pointer',
                width: "120px",
                padding: "10px",
                margin: "20px",
                margin: "auto"
            }}
        >
            <Card.Title style={{"fontSize": "16px"}}>Add Collectibles Here!</Card.Title>
        </Card>
    );
};

export default AddCollectible;