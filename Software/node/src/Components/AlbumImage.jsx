import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'

const AlbumImage = (props) => {
    const [img, setimg] = useState()

    useEffect(() => {
        const getImage = async (id) => {
            try {
                const response = await fetch("http://localhost:3300/index.php/home/getImage?image_id=" + id, {
                    method: 'GET',
                    mode: 'cors',
                    responseType: 'blob'
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const imgBlob = await response.blob();
                const imgBlobURL = URL.createObjectURL(imgBlob);
                console.log(imgBlobURL);
                setimg(imgBlobURL);
                console.log(img)
            } catch (error) {
                console.error('Error fetching image:', error)
            }
        }

        getImage(props.id)
    }, [props.id])

    return (
        
        <Card.Img src={img}
        style={{
            height: "60%",
            objectFit: "contain",
            objectPosition: "center"
        }} />
    )
}

export default AlbumImage;