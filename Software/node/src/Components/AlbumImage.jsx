import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'

const AlbumImage = (props) => {
    const [img, setimg] = useState(null)
    useEffect(() => {
        const getImage = async (id) => {
            const response = await fetch("http://localhost:3300/index.php/home/getImage?image_id=" + id,
                {
                    method: 'GET',
                    mode: 'cors'
                }
            )
            const imgBlob = await response.blob()
            console.log(imgBlob)
            setimg(URL.createObjectURL(imgBlob))
            console.log(id)
            console.log(img)
        }
        getImage(props.id)
    },[])

    return(
        
        <Card.Img src = {require(img)}/>
    )

}
export default AlbumImage;