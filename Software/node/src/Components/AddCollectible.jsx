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
                width: "150px",
                padding: "10px",
                margin: "20px",
                margin: "auto"
            }}
        >
            <Card.Body style={{ "fontSize": "16px" }}><strong>Add Collectibles Here!</strong></Card.Body>
        </Card>
    );
};

export default AddCollectible;