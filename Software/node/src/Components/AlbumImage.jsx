import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'

const AlbumImage = (props) => {
    const [imgSrc, setImgSrc] = useState(null)
    useEffect(() => {
        const getImage = async (id) => {
            const response = await fetch("http://localhost:3300/index.php/home/getImage?image_id=" + id,
                {
                    method: 'GET',
                    mode: 'cors'
                }
            )
            const data = await response.json()
            console.log(data)
            setImgSrc("data:image/jpeg;base64," + atob(data.imageData))
        }
        getImage(props.id)
    }, [])

    return (
        <Card.Img src={imgSrc} />
    )

}
export default AlbumImage;