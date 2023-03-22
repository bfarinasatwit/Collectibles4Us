import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CloseButton as BootClose,
    Form as BootForm,
    Button as BootButton,
    Modal as BootModal
} from 'react-bootstrap'


const NewUserForm = (props) => {
    const nav = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const [usedEmail, setUsedEmail] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()
        fetch("http://localhost:3300/index.php/login/newUser",
            {
                method: 'PUT',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    passwd: passwd
                })
            }
        ).then(response => response.json())
            .then(data => {console.log(data);
            if(!data.error){
                nav("/home", { state: data[0]})
            }
            })
            .catch(error => console.error(error))
    }

    return (
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App">

            <BootModal.Header closeButton className='close-button'></BootModal.Header>

            <BootForm style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate}>

                <BootForm.Label className="form-control" style={{ "marginTop": "2rem" }}>
                    First Name
                </BootForm.Label>

                <BootForm.Control required placeholder="Enter first name" onChange={(event) => setFirstName(event.target.value)} />

                <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                    Last Name
                </BootForm.Label>

                <BootForm.Control required placeholder="Enter last name" onChange={(event) => setLastName(event.target.value)} />

                <BootForm.Label className="form-control" style={{ "marginTop": "2rem" }}>
                    Email Address
                </BootForm.Label>

                <BootForm.Control required type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />

                <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                    Password
                </BootForm.Label>

                <BootForm.Control required type="password" placeholder="Enter password" onChange={(event) => setPasswd(event.target.value)} />

                <BootButton className="form-control" variant="dark" style={{ "marginTop": "0.5rem", "marginBottom": "6rem" }} type="submit">
                    Submit
                </BootButton>
            </BootForm>
        </BootModal>
    )
}

export default NewUserForm;