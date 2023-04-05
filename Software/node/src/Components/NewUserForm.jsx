import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CloseButton as BootClose,
    Form as BootForm,
    Button as BootButton,
    Modal as BootModal,
    Col as Col,

} from 'react-bootstrap'


const NewUserForm = (props) => {
    const nav = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const [confpasswd, setConf] = useState('')
    const [emailError, setEmailError] = useState('Email must contain an @ followed by a .domain ending')
    const [validated, setValidated] = useState(false);
    const [passError, setPassError] = useState('')
    const [matchError, setMatchError] = useState('')



    function check() {
        //password check function
        if (passwd != confpasswd || passwd.length < 8) {
            console.log(passwd)
            console.log(confpasswd)
            setValidated(false)
        }
        else {
            setValidated(true)
        }
    }

    useEffect(() => {
        //delays last password tick so confirmed pass is not delayed one input
        if ((passwd !== "" || confpasswd !== "" || (passwd != confpasswd) || (confpasswd.length || passwd.length < 8))) {
            setValidated(false)
            console.log("invalid pass")
            setPassError("Invalid password")
            setMatchError("Invalid password")
            if (passwd != confpasswd) {
                setMatchError("Passwords do not match")
            }
        }


        check()


    }, [passwd, confpasswd])

    function checkValidity() {
        if (!(!!firstName)) {
            console.log("Missing First Name");
            setValidated(false)
            return
        }
        if (!(!!lastName)) {
            console.log("Missing Last Name")
            setValidated(false)
            return
        }
        if (!email.includes("@") || !email.substring(email.lastIndexOf("@")).includes(".") || !email.substring(email.lastIndexOf(".") + 1)) {
            setEmailError("Email must contain an @ followed . and domain ending")
            setValidated(false)
            return
        }
        check();

    }


    const handleCreate = (event) => {

        event.preventDefault();
        check(); //check password redundancy


        const forms = document.querySelectorAll('form');
        const form = forms[0];

        checkValidity()

        console.log(validated)
        if (validated == true) {
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
                .then(data => {
                    console.log(data);
                    if (!data.error) {
                        nav("/home", { state: data[0] })
                    } else {
                        console.log(emailError)
                        setEmailError("The email entered has already been used.")
                    }
                })
                .catch(error => console.error(error))
        }

    }


    return (
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App" backdrop='static'>

            <BootModal.Header closeButton className='close-button'></BootModal.Header>

            {/*noValidate allws custom validation functions and returns instead of the browswer default
            grouping treats visuals together */}

            <BootForm noValidate validated={validated} style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate}>
                <BootForm.Group as={Col} controlId="validationCustom01">
                    <BootForm.Label className="form-control" style={{ "marginTop": "2rem" }}>
                        First Name
                    </BootForm.Label>
                    <BootForm.Control required isInvalid={!/[a-zA-Z]/.test(firstName)} placeholder="First name" onChange={(event) => setFirstName(event.target.value)} />
                    {/*custom feedback div*/}
                    <BootForm.Control.Feedback type="invalid">
                        Please enter your first name
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col} controlId="validationCustom02">
                    <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                        Last Name
                    </BootForm.Label>
                    <BootForm.Control required type="text" isInvalid={!/[a-zA-Z]/.test(lastName)} placeholder="Last name" onChange={(event) => setLastName(event.target.value)} />
                    <BootForm.Control.Feedback type="invalid">
                        Please enter your Last name
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col} controlId="validationCustom03">
                    <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                        Email Address
                    </BootForm.Label>
                    <BootForm.Control required type="email" isInvalid={!email.includes("@") || !email.substring(email.lastIndexOf("@")).includes(".") || !email.substring(email.lastIndexOf(".") + 1)
                        || emailError == "The email entered has already been used."} placeholder={"Email"} onChange={(event) => setEmail(event.target.value)} pattern="[A-Za-z0-9]{1,30}@[A-Za-z0-9]{1,30}.[A-Za-z]{1,10}" />
                    <BootForm.Control.Feedback type="invalid">
                        {emailError}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col} controlId="validationCustom04">
                    <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                        Password
                    </BootForm.Label>
                    <BootForm.Control required id="password" name="password" isInvalid={passwd.length < 8 || !/[a-z]/.test(passwd) || !/[A-Z]/.test(passwd) || !/[0-9]/.test(passwd)} type="password" placeholder="Enter password" onChange={(event) => { setPasswd(event.target.value) }} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" />
                    <BootForm.Control.Feedback type="invalid">
                        {passError}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col} controlId="validationCustom05">
                    <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                        Confirm Password
                    </BootForm.Label>
                    <BootForm.Control required id="confirm_password" isInvalid={passwd != confpasswd || passwd.length < 8 || !/[a-z]/.test(passwd) || !/[A-Z]/.test(passwd) || !/[0-9]/.test(passwd)} name="password_two" type="password" placeholder="Confirm password" onInput={(event) => { setConf(event.target.value); check(event.target) }} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" />
                    <BootForm.Control.Feedback type="invalid">
                        {matchError}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                {/*on click check passwords redundancy */}
                <BootButton onClick={() => check()} className="form-control" variant="dark" style={{ "marginTop": "0.5rem", "marginBottom": "6rem" }} type="submit"  >
                    Submit
                </BootButton>


            </BootForm>



        </BootModal>
    )
}

export default NewUserForm;
