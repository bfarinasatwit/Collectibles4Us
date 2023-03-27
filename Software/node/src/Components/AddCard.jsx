import React from 'react';
import Card from 'react-bootstrap/Card';

const AddCard = ({ onClick }) => {
    return (
        <Card
            className="shadow"
            onClick={onClick}
            style={{
                cursor: 'pointer',
                width: "308px",
                height: "400px",
                margin: "20px"
            }}
        >
            <Card.Img
               src = {require("../pictures/edit.png")}
                style={{
                    height: "75%",
                    objectFit: "cover",
                    objectPosition: "center"
                }}
            />
            <Card.Title>Add Collections Here!</Card.Title>
        </Card>
    );
};

export default AddCard;