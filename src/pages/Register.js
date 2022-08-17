import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import regImg from '../assets/38753847.jpg'

export default function Register(){

    const history = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isActive, setIsActive] = useState(false);

    console.log(email);
    console.log(password1);
    console.log(password2);

    function registerUser(e){
		e.preventDefault();

		fetch('https://obscure-everglades-49200.herokuapp.com/users/checkEmail', {
		    method: "POST",
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		        email: email
		    })
		})
		.then(res => res.json())
		.then(data => {

		    console.log(data);

		    	if(data === true){
					Swal.fire({
		    			title: 'Duplicate email found',
		    			icon: 'error',
		    			text: 'Kindly provide another email to complete the registration.'	
		    		});
		    	}else {
                    fetch('https://obscure-everglades-49200.herokuapp.com/users/register', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            mobileNumber: mobileNumber,
                            password: password1
                        })
                    })
                    .then(res => res.json())
                    .then(data => {

                        console.log(data);

                        if (data === true) {

                            setFirstName('');
                            setLastName('');
                            setEmail('');
                            setMobileNumber('');
                            setPassword1('');
                            setPassword2('');

                            Swal.fire({
                                title: 'All set!',
                                icon: 'success',
                                text: 'Start your adventure'
                            });

                            history("/login");

                        } else {

                            Swal.fire({
                                title: 'Something went wrong',
                                icon: 'error',
                                text: 'Please try again.'   
                            });

                        }
                    })
                };
		})
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobileNumber('');
        setPassword1('');
        setPassword2('');
    }

    useEffect(() => {
        if((firstName !== '' && lastName !== '' && email !== '' && mobileNumber !== '' &&  mobileNumber.length === 11 && password1 !== '' && password2 !== '') && (password1 === password2)){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNumber, password1, password2]);

    return(
        <Row>
            <Col className="banner">
                <Container style={{
                                diplay: 'flex',
                                justifyContent: 'center',
                                width: '70%',
                                textAlign: 'center',
                                color: '#5D4632',
                                paddingTop: '50px',
                                paddingbottom: '100px'
                            }}>
                    <Form onSubmit={(e) => registerUser(e)}>
                        <h1 style={{ fontSize: '50px' }}>Register</h1>
                        <p>Already registered? Login <Link to="/login">here</Link>.</p>
                        <Row>
                            <Form.Group className="mb-3 w-50" controlId="userFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="string"
                                    placeholder="Enter first name" 
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-50" controlId="userLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="string"
                                    placeholder="Enter last name" 
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        
                        <Row>
                            <Form.Group className="mb-3 w-50" controlId="userEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-50" controlId="mobileNumber">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control 
                                    type="tel"
                                    placeholder="Enter Mobile Number" 
                                    value={mobileNumber}
                                    onChange={e => setMobileNumber(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        
                        <Row>
                            <Form.Group className="mb-3 w-50" controlId="password1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password1}
                                onChange={e => setPassword1(e.target.value)}
                                required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-50" controlId="password2">
                                <Form.Label>Verify Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Verify Password" 
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        
                        { isActive ?
                            <Button className="my-3" variant="success" type="submit" id="submitBtn">
                            Submit
                            </Button>
                        :
                            <Button className="my-3" variant="secondary" type="submit" id="submitBtn" disabled>
                            Submit
                            </Button>
                        }
                    </Form>
                </Container>

                <Container className="mx-auto d-none d-md-block">
                    <img
                    src={regImg}
                    alt="Register"
                    style={{
                        width: '100%',
                        maxWidth: '700px',
                        height: 'auto',
                        borderRadius: '50px'
                    }}
                    />
                </Container>
            </Col>
        </Row>
    )
}
