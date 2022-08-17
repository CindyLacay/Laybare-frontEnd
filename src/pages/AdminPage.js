import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import adImg from '../assets/31345451.jpg'

export default function AdminPage() {
	return (
        <Row>
            <Col className="banner">
					<Container className="mx-auto d-none d-md-block">
						<img
						src={adImg}
						alt="admin"
						style={{
							width: '100%',
							maxWidth: '700px',
							height: 'auto',
							borderRadius: '50px'
						}}
						/>
					</Container>
                <Container>
                    <h1 style={{ fontSize: '100px' }}>Admin Dashboard</h1>
                    <h3 className="pb-4">What do you want to do today?</h3>
                    <Button style={{ 
						backgroundColor: 'transparent',
						color: 'rgb(93, 70, 50)',
						fontWeight: '800',
						marginRight: '10px',
						borderColor: 'rgb(93, 70, 50)' }}
						as={Link} to='/users/orders'
						>View all orders
					</Button>
					<Button style={{ 
						backgroundColor: 'transparent',
						color: 'rgb(93, 70, 50)',
						fontWeight: '800',
						marginRight: '10px',
						borderColor: 'rgb(93, 70, 50)' }}
						as={Link} to='/products/all'
						>View all books
					</Button>
					<Button style={{ 
						backgroundColor: 'transparent',
						color: 'rgb(93, 70, 50)',
						fontWeight: '800',
						marginRight: '10px',
						borderColor: 'rgb(93, 70, 50)' }}
						as={Link} to='/products/addProduct'
						>Add a book
					</Button>
                </Container>
            </Col>
        </Row>

    )
}
    