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
    const [usedEmail, setUsedEmail] = useState('')
    const [validated, setValidated] = useState(false);

    
    function check(event){
        //password check function
        if (passwd != confpasswd || passwd.length < 8 ){
            console.log(passwd)
            console.log(confpasswd)
            setValidated(false)
        }
    }

    useEffect(() => {
        //delays last password tick so confirmed pass is not delayed one input
        if((passwd !== "" && confpasswd !== "") && (passwd !== 
           confpasswd)){
                 setValidated(false)
    
        }
    
       check()
       setValidated(true)   
    
      }, [passwd, confpasswd])

    /*
    handleChange = async function(event) {
        check();
        await this.setConf({confpasswd: event.target.value});
        check();
        console.log(this.state.confpasswd);
    }
    */
        

    
    const handleCreate = (event) => {
        
        event.preventDefault()
        
        check(); //check password redundancy
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        if (!email.includes("@") || !email.substring(email.lastIndexOf("@") + 1).includes(".") || !email.substring(email.lastIndexOf(".") + 1)){
            setUsedEmail("Email must contain an @ followed . and domain ending")
            console.log(email)
            setValidated(false)
        }
        //redundant checks
        if(passwd != confpasswd || passwd.length < 8) {
            setValidated(false)
        } else {
            setValidated(true)
        }

        console.log(validated)
        if (validated == true){
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
            }else {
                setUsedEmail("The email entered has already been used.")
            }
            })
            .catch(error => console.error(error))
        }
        
    }
    

    return (
        <BootModal show={props.showModal} onHide={props.onEsc} onEscapeKeyDown={props.onEsc} className="App">

            <BootModal.Header closeButton className='close-button'></BootModal.Header>

            {/*noValidate allws custom validation functions and returns instead of the browswer default
            grouping treats visuals together */}
            
            <BootForm noValidate validated={validated}  style={{ "margin": "auto", "minWidth": "60%" }} onSubmit={handleCreate}> 
                <BootForm.Group as={Col}  controlId="validationCustom01">
                    <BootForm.Label className="form-control" style={{ "marginTop": "2rem" }}>
                        First Name
                    </BootForm.Label>
                    <BootForm.Control required placeholder="First name" onChange={(event) => setFirstName(event.target.value)} />
                    {/*custom feedback div*/}
                    <BootForm.Control.Feedback type = "invalid"> 
                            Please enter your first name
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col}  controlId="validationCustom02">
                    <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                        Last Name
                    </BootForm.Label>
                    <BootForm.Control required placeholder="Last name" onChange={(event) => setLastName(event.target.value)} />
                    <BootForm.Control.Feedback type = "invalid"> 
                            Please enter your Last name
                    </BootForm.Control.Feedback>
                </BootForm.Group>
                
                <BootForm.Group as={Col}  controlId="validationCustom03">
                    <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                        Email Address
                    </BootForm.Label>
                    <BootForm.Control required type="email" placeholder = {"Email"} onChange={(event) => setEmail(event.target.value)} pattern = "[A-Za-z0-9]{1,30}@[A-Za-z]{1,30}.[A-Za-z]{1,10}"/>
                    <BootForm.Control.Feedback type = "invalid"> 
                        {usedEmail}
                    </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col}  controlId="validationCustom04">    
                <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                    Password
                </BootForm.Label>
                <BootForm.Control required id = "password" name = "password"  type="password" placeholder="Enter password" onChange={(event) => {setPasswd(event.target.value)}} pattern="^\S{6,}$" />
                <BootForm.Control.Feedback type = "invalid"> 
                    <p>Password must contain at least 8 characters, <br />  one upper and lowercase letter, and a number</p>
                </BootForm.Control.Feedback>
                </BootForm.Group>

                <BootForm.Group as={Col}  controlId="validationCustom05">
                <BootForm.Label className="form-control" style={{ "marginTop": "0.5rem" }}>
                    Confirm Password    
                </BootForm.Label>
                <BootForm.Control required id="confirm_password" name="password_two"  type="password" pattern="^\S{6,}$" placeholder="Confirm password" onInput={(event) => {setConf(event.target.value); check(event.target)}} onClick = {() => check()}/>
                <BootForm.Control.Feedback type = "invalid"> 
                    Passwords must match
                </BootForm.Control.Feedback>
                </BootForm.Group>

                {/*on click check passwords redundancy */}
                <BootButton  onClick = {() => check()} className="form-control" variant="dark" style={{ "marginTop": "0.5rem", "marginBottom": "6rem" }} type="submit"  >
                        Submit
                </BootButton>

                
            </BootForm>

            

        </BootModal>
    )
}

export default NewUserForm;