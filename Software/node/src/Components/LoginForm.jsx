import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/LoginForm.css'
import {
    Form as BootForm,
    Button as BootButton,
    Image as BootImage
} from 'react-bootstrap'
import card from "../pictures/card.avif"

const LoginForm = () => {
    const nav = useNavigate()
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch("http://localhost:3300/index.php/login/login",
            {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    passwd: passwd
                })
            }
        ).then(response => response.json())
            .then(data => {console.log(data);
                   if (!data.error) {
                    nav("/home", { state: data[0]})
                   }}) 
            .catch(error => console.error(error))
    }

    return (
        <>
            <BootForm className="my-login-form" onSubmit={handleSubmit}>
                <BootImage rounded src={card} ></BootImage>
                <BootForm.Label className="form-control" >
                    Email Address
                </BootForm.Label>

                <BootForm.Control required type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />

                <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                    Password
                </BootForm.Label>

                <BootForm.Control required type="password" placeholder="Enter password" onChange={(event) => setPasswd(event.target.value)} />

                <BootButton className="form-control" variant="dark" style={{ "marginTop": "0.5rem", "marginBottom": "0.5rem" }} type="submit">
                    Sign In
                </BootButton>
            </BootForm>
        </>
    )
}

export default LoginForm;