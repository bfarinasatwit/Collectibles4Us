import React from 'react';
import Card from 'react-bootstrap/Card';

const AddCard = ({ onClick }) => {
    return (
        <Card
            className="shadow"
            onClick={onClick}
            style={{
                cursor: 'pointer',
                width: "200px",
                height: "300px",
                margin: "auto"
            }}
        >
            <Card.Img
               src = {require("../pictures/edit.png")}
                style={{
                    height: "75%",
                    objectFit: "contain",
                    objectPosition: "center"
                }}
            />
            <Card.Title>Add Collections Here!</Card.Title>
        </Card>
    );
};

export default AddCard;