import React, { useState, useEffect } from "react";
import Card from'react-bootstrap/Card'

const CollectibleImage = ({ id }) => {
    const [img, setImg] = useState(null)

    useEffect(() => {
        //function for pulling the image from the apache db
        const getImage = async (id) => {
            try {
                //fetch request
                const response = await fetch("http://localhost:3300/index.php/home/getCollectibleImage?collectible_id=" + id, {
                    method: 'GET',
                    mode: 'cors',
                    responseType: 'blob'
                })
                //error if response is not ok
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                //saving the response as a blob then creating a URL
                //for it and then setting img to that URL
                const imgBlob = await response.blob();
                const imgBlobURL = URL.createObjectURL(imgBlob);
                
                setImg(imgBlobURL);
                
            } catch (error) {
                console.error('Error fetching image: ', error)
            }
        }

        getImage(id)
    }, [id])

    return (
        <Card.Img src={img} style={{
            "height": "50%",
            "objectFit": "contain",
            "objectPosition": "center",
            "marginBottom": "20px",
        }}/>
    )
}

export default CollectibleImage