import React from 'react';
import Card from 'react-bootstrap/Card';

const AddCard = ({ showModal }) => {
    return (
        <Card
            className="shadow"
            onClick={showModal}
            style={{
                cursor: 'pointer',
                width: "308px",
                height: "400px",
                margin: "20px"
            }}
        >
            <Card.Img
                src={require('../media/edit.png')}
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