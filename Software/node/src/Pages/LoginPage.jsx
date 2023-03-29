import React, { useState } from 'react'
import LoginForm from '../Components/LoginForm'
import NewUserForm from '../Components/NewUserForm'
import { Button as BootButton } from 'react-bootstrap'

const LoginPage = () => {

    const handleShow = () => { setShow(true) }
    const handleHide = () => { setShow(false) }

    const [show, setShow] = useState(false)

    return (
        <>
            <LoginForm />

            <div className="d-flex" style={{ "justifyContent": "space-between", "margin": "auto", "maxWidth": "40%" }}>
                <BootButton className="flex-fill align-center" style={{ "maxWidth": "40vw" }} variant="dark" onClick={handleShow}>
                    Create Account
                </BootButton>

                <NewUserForm showModal={show} onEsc={handleHide}/>
            </div>
        </>
    )
}

export default LoginPage;