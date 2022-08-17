import React, { Fragment, useEffect, useState } from 'react';
import { Container, Table, Button, Row, Form, Modal } from 'react-bootstrap';
import { Input, InputAdornment } from '@mui/material';
import { Link } from "react-router-dom";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Swal from 'sweetalert2';

export default function AllBooks(){

	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

    const [showUpdate, setShowUpdate] = useState(false);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const [stock, setStock] = useState("");

	const fetchAllProducts = () => {
		fetch('https://obscure-everglades-49200.herokuapp.com/products/all', {
            headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
        })
		.then(res => res.json())
		.then(data => {
			setProducts(data)
		})
	}

	useEffect(() => {
			fetchAllProducts()
	}, []);

    const openUpdate = (_id) => {

		fetch(`https://obscure-everglades-49200.herokuapp.com/products/${_id}`)
		.then(res => res.json())
		.then(data => {
            setId(data._id);
			setName(data.name);
            setImage(data.image);
			setDescription(data.description);
			setPrice(data.price);
            setStock(data.stock);
		});

		setShowUpdate(true);

	};

    const closeUpdate = () => {
        setName("");
        setImage("");
        setDescription("");
        setPrice(0);
        setStock("");
        setShowUpdate(false);
    }

    const updateProduct = (e, _id) => {

		e.preventDefault();

		fetch(`https://obscure-everglades-49200.herokuapp.com/products/${_id}/update`, {
			method: 'PUT',
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
                    title: 'Updated!',
                    icon: 'success'
                });
                fetchAllProducts();
                setName("");
                setImage("");
				setDescription("");
				setPrice(0);
                setStock("");
                closeUpdate();

			} else {
				Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error'
                });
                closeUpdate();
            }
        })
    }

    const archiveProduct = (_id) => {
        fetch(`https://obscure-everglades-49200.herokuapp.com/products/${_id}//archive`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
            }
        })
        .then(res => res.json())
        .then(data => {
            
            if (data === true) {
                fetchAllProducts();
                Swal.fire({
                    title: 'Archived!',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error'
                });
            }

        });

    };

    const activateProduct = (_id) => {
        fetch(`https://obscure-everglades-49200.herokuapp.com/products/${_id}//activate`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data === true) {
                fetchAllProducts();
                Swal.fire({
                    title: 'Activated!',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error'
                });
            }

        });

    };

    const deleteProduct = (_id) => {
        fetch(`https://obscure-everglades-49200.herokuapp.com/products/${_id}//delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data === true) {
                fetchAllProducts();
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error'
                });
            }

        });

    };

	return(
		<Fragment>

            <h1 style={{ 
                fontSize: '50px',
                color: '#5D4632',
                textAlign: 'center',
                borderColor: '#5D4632',
                marginTop: '20px',
                fontWeight: '800' }} 
            >All Books</h1>

            <div className='text-center'>
                <p>Search by name:</p>
            </div>

			<Container style={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '20px'
			}}>
		
			<Input
				style={{
					height: '50%',
					width: '50%',
					marginTop: '10px',
					marginBottom: '40px',
                    fontFamily: 'Bitter',
                    color: '#5D4632'
				}}
				type="text"
				placeholder="Looking for something?"
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				startAdornment={
					<InputAdornment position="start">
						<SearchTwoToneIcon />
					</InputAdornment>
				}
				/>
			</Container>
			
            <Table responsive
                style={{ 
                    fontFamily: 'Bitter',
                    color: '#5D4632',
                    textAlign: 'center',
                    borderColor: '#5D4632',
                    minWidth: 500 }}
                className="table table-hover">
                    <thead
                        style={{
                            backgroundColor: '#5D4632',
                            color: 'white'
                        }}>
                        <tr>
                            <th>Produc ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stocks</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.filter((product) => {
                            if (searchTerm === "") {
                                return product;
                            } 
                            else if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return product;
                            }
                        })
                        .map((product) => {
                            return (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td><Link to={`/products/${product._id}`}>{product.name}</Link></td>
                                    <td>Php {product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        {product.isActive ?
                                            <span>Available</span>
                                        :
                                            <span>Out of Stock</span>
                                        }
                                    </td>
                                    <td>
                                        <Button 
                                            style={{ 
                                                backgroundColor: 'transparent',
                                                color: 'blue',
                                                borderColor: 'blue' }} 
                                            size="sm" 
                                            onClick={() => openUpdate(product._id)}
                                        >
                                            Edit
                                        </Button>
                                        {product.isActive ?
                                            <Button 
                                                style={{ 
                                                    backgroundColor: 'transparent',
                                                    color: 'red',
                                                    borderColor: 'red',
                                                    marginRight: '10px',
                                                    marginLeft: '10px' }} 
                                                size="sm"
                                                onClick={() => archiveProduct(product._id)}
                                            >
                                                Disable
                                            </Button>
                                        :
                                            <Button
                                            style={{ 
                                                backgroundColor: 'transparent',
                                                color: 'green',
                                                borderColor: 'green',
                                                marginRight: '10px',
                                                marginLeft: '10px' }} 
                                                size="sm"
                                                onClick={() => activateProduct(product._id)}
                                            >
                                                Enable
                                            </Button>
                                        }
                                        <Button 
                                            style={{ 
                                                backgroundColor: 'transparent',
                                                color: 'gray',
                                                borderColor: 'gray' }} 
                                            size="sm" 
                                            onClick={() => deleteProduct(product._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                                )
                        })}
                    </tbody>
                </Table>

                <Modal 
                    show={showUpdate} 
                    onHide={closeUpdate}
                    style={{ 
                        fontFamily: 'Bitter',
                        color: '#5D4632' }}>
                    <Form onSubmit={e => updateProduct(e, id)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ 
                                fontSize: '50px' }}>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Form.Group className="mb-3 w-50" controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="string"
                                        placeholder="Product Name" 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                
                            </Row>
                            <Row>
                                <Form.Group className="mb-3 w-100" controlId="Image">
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
                                        placeholder="Enter book description" 
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

                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{ 
                                backgroundColor: 'transparent',
                                color: 'red',
                                borderColor: 'red',
                                fontWeight: '800',
                                marginRight: '10px',
                                marginLeft: '10px' }}
                                onClick={closeUpdate}>
                                Cancel
                            </Button>

                            <Button style={{ 
                                backgroundColor: 'transparent',
                                color: 'green',
                                borderColor: 'green',
                                fontWeight: '800',
                                marginRight: '10px',
                                marginLeft: '10px' }} type="submit">
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>	
                </Modal>

		</Fragment>
	)
}
