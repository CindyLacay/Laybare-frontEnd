import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){

    const { user } = useContext(UserContext);

    return (
        <Navbar variant='dark' style={{ 
            backgroundColor: '#E86A92',
            paddingLeft: '20px',
            paddingRight: '20px',
            fontWeight: '500',
            fontFamily: 'Arial',
            expand: 'large' }}>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="me-auto">
                    <Navbar.Brand as={Link} to="/">LayBare</Navbar.Brand>
                </Nav>

                <Nav>
                    <Nav.Link as={Link} to="/" exact>Home</Nav.Link>

                    {(function(){
                        if(user.id !== null && user.isAdmin === false){
                            return (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/products" exact>Products</Nav.Link>
                                <Nav.Link as={Link} to="/cart" exact>Cart</Nav.Link>
                                <Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
                            </React.Fragment>
                            )
                        } else if(user.id !== null && user.isAdmin === true){
                            return (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/products" exact>Active Products</Nav.Link>
                                <Nav.Link as={Link} to="/admin" exact>Admin</Nav.Link>
                                <Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
                            </React.Fragment>
                            )
                        } else {
                            return (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/products" exact>Products</Nav.Link>
                                <Nav.Link as={Link} to="/login" exact>Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" exact>Register</Nav.Link>
                            </React.Fragment>
                            )
                        }
                    })()}
                </Nav>

                </Navbar.Collapse>
        </Navbar>
    )
}