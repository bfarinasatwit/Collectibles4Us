import React from 'react';
import Card from 'react-bootstrap/Card';

const AddCard = ({ onClick }) => {
    return (
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