import React, { useEffect, useState } from 'react'
import {Carousel} from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselComponent = (props) =>{

    
    {console.log(props.id)}
    const [data, setdata] = useState([])
    useEffect (() => {
        
    fetch('http://localhost:3300/index.php/home/getProfile?user_id=' + props.id,
        {
            method: 'GET',
            mode: 'cors',
        }
    ).then(response => response.json())
    .then(data => {console.log(data);
        setdata(data)
    })
    .catch(error => console.error(error))
},[]);




    return(
        
        <div>
            
            {(data[0].alubum_thumbnail)}
            
        </div>
    )
}


export default CarouselComponent;