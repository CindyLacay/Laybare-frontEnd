import React, {useState, useContext} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import loginImg from '../assets/31345434.jpg';

export default function Login(props){

    const history = useNavigate();

    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [willRedirect, setWillRedirect] = useState(false);

    function authenticate(e){
        e.preventDefault();

        fetch('https://obscure-everglades-49200.herokuapp.com/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(typeof data.access !== "undefined"){
                localStorage.setItem('token', data.access);
                retrieveUser(data.access);
                Swal.fire({
                    Icon: 'success',
                    title: 'Login success!',
                    timer: 1500
                })
            }
            else{
                Swal.fire({
                    Icon: "error",
                    title: "Please try again!",
                    text: "Your login details may be incorrect.",
                    timer: 1500
                })
            }
        })

        setEmail('');
        setPassword('');
    }

    const retrieveUser = (token) => {
        fetch('https://obscure-everglades-49200.herokuapp.com/users/details', {
            headers: {Authorization: `Bearer ${ token }`}
        })
        .then(res => res.json())
        .then(data => {
            
            setUser({ id: data._id, isAdmin: data.isAdmin });

            if (data.isAdmin === true) {
                setWillRedirect(true);
            } else {
                if (props.location.state.from === 'cart') {
                    history.goBack();
                } else {
                    setWillRedirect(true);
                }
            }

        })
    }

    return (
        function(){
            if(user.id !== null && user.isAdmin === false){
                return (
                    <Navigate to="/products" />
                )
            } else if(willRedirect === true && user.isAdmin === true){
                return (
                    <Navigate to="/admin" />
                )
            } else {
                return (
                    <Row>
                        <Col className="banner">
                            <Container className="mx-auto d-none d-md-block">
                                <img
                                src={loginImg}
                                alt="Login"
                                style={{
                                    width: '100%',
                                    maxWidth: '450px',
                                    height: 'auto',
                                    borderRadius: '50px'
                                }}
                                />
                            </Container>
                            <Container style={{
                                diplay: 'flex',
                                justifyContent: 'center',
                                width: '50%',
                                textAlign: 'center',
                                color: '#5D4632',
                                paddingTop: '85px',
                                paddingbottom: '100px'
                            }}>
                                <Form onSubmit={(e) => authenticate(e)}>
                                    <h1 style={{ fontSize: '50px' }}>Login</h1>
                                    <p>No account yet? Create an account <Link to="/register">here</Link>.</p>
                                    <Form.Group className="mb-3" controlId="userEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button className="mb-3" variant="success" type="submit" id="submitBtn">
                                        Submit
                                    </Button>
                                </Form>
                            </Container>
                        </Col>
                    </Row>
                )
            }
        }()  
    )
}
