import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import addImg from '../../assets/38753847.jpg';

export default function AddBook(){

    const history = useNavigate();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const [stock, setStock] = useState("");

    const addProduct = (e) => {

		e.preventDefault();

		fetch('https://obscure-everglades-49200.herokuapp.com/books/addProduct', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
                image: image,
				description: description,
				price: price,
                stock: stock
			})
		})
		.then(res => res.json())
		.then(data => {

			if (data === true) {

                Swal.fire({
                    title: 'New Product added!',
                    icon: 'success'
                });
                setName("");
                setImage("");
				setDescription("");
				setPrice(0);
                setStock("");

                history("/products/all");

			} else {

				Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error'
                });

			}

		});

	};

    return (
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
                    <Form onSubmit={e => addProduct(e)}>
                            <h1 style={{ fontSize: '50px' }}>Add a Product</h1>
                            <Row>
                            <Form.Group className="mb-3 w-50" controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control 
                                    type="string"
                                    placeholder="Enter product Name" 
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3 w-100" controlId="productImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control 
                                    type="string"
                                    placeholder="Enter image link" 
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3 w-100" controlId="Description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type="string"
                                    placeholder="Enter  description" 
                                    value={description}
                                    as="textarea" rows={5}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3 w-50" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control 
                                type="currency" 
                                placeholder="Price" 
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-50" controlId="stock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Stock" 
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <React.Fragment>
                            <Button style={{ 
                                backgroundColor: 'transparent',
                                color: 'red',
                                borderColor: 'red',
                                fontWeight: '800',
                                marginRight: '10px',
                                marginLeft: '10px' }}
                                as={Link} to='/admin'>
                                Cancel
                            </Button>

                            <Button style={{ 
                                backgroundColor: 'transparent',
                                color: 'green',
                                borderColor: 'green',
                                fontWeight: '800',
                                marginRight: '10px',
                                marginLeft: '10px' }} type="submit">
                                Add
                            </Button>
                        </React.Fragment>
                    </Form>	
                </Container>

                <Container className="mx-auto d-none d-md-block">
                    <img
                    src={addImg}
                    alt="Add Book"
                    style={{
                        width: '100%',
                        maxWidth: '550px',
                        height: 'auto',
                        borderRadius: '50px'
                    }}
                    />
                </Container>
            </Col>
        </Row>

    )

}