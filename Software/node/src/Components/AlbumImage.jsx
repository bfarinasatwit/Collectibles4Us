import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'

/**
 * Function to get the image for each collection
 * gets passed the id of the album's image
 */
const AlbumImage = (props) => {
    const [img, setimg] = useState()

    useEffect(() => {
        //function for pulling the image from the apache db
        const getImage = async (id) => {
            try {
                //fetch request
                const response = await fetch("http://localhost:3300/index.php/home/getAlbumImage?album_id=" + id, {
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
                
                setimg(imgBlobURL);
                
            } catch (error) {
                console.error('Error fetching image:', error)
            }
        }

        getImage(props.id)
    }, [props.id])

    return (
        //returning the image with styling
        <Card.Img src={img}
        style={{
            height: "50%",
            objectFit: "contain",
            objectPosition: "center"
        }} />
    )
}

export default AlbumImage;