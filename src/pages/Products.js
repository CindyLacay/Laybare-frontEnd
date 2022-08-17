import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { Grid, Input, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Swal from 'sweetalert2';

export default function Products(){

	const { user } = useContext(UserContext);

	const [product, setProduct] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	
	const fetchProducts = () => {
		fetch('https://obscure-everglades-49200.herokuapp.com/products')
		.then(res => res.json())
		.then(data => {
			setProduct(data)
		})

	}

	const addToCart = (id, name, quantity) => {
		fetch('https://obscure-everglades-49200.herokuapp.com/users/checkout', {
			method: "POST",
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`,
				'Content-Type': 'application/json'
			  },
			body: JSON.stringify({
			productId: id,
			name: name,
			quantity: quantity
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data === true) {

                Swal.fire({
                    title: 'Added to cart!',
                    icon: 'success'
                });
			}
			else {

				Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error'
                });
			}
		})
	}

	useEffect(() => {
			fetchProducts()
	}, []);

	return(
		<Fragment>
					<h1 style={{ 
		                fontSize: '50px',
		                color: '#5D4632',
		                textAlign: 'center',
		                borderColor: '#5D4632',
		                marginTop: '20px',
		                fontWeight: '800' }} 
		            >Products</h1>

					<div className='text-center'>
		                <p>Search by name</p>
		            </div>

					<Container style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '40px'
					}}>
				
					<Input
						style={{
							height: '50%',
							width: '50%',
							marginTop: '10px',
							marginBottom: '50px'
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

					<Grid 
						container 
						direction="row"
						justifyContent="space-evenly"
						alignItems="center" 
						columns={{ md: 12 }}>
						{product.filter((product) => {
							if (searchTerm === "") {
								return product;
							} 
							else if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
								return product;
							}
							
						})
						.map((product) => {
							return (
								<Grid md={3}>
										<Card style={{ 
											width: '230px',
											marginTop: '25px',
											textAlign: 'center',
											color: '#5D4632',
											fontFamily: 'Bitter',
											height: '650px',
											backgroundColor: 'transparent',
											borderColor: 'rgb(93, 70, 50)' }}
											key={product._id}>
											<Container>
												<img
												src={product.image}
												height="270px"
												width="200px"
												style={{ 
													marginTop: '15px',
													borderRadius: '20px'
												}}
												/>
											</Container>
											<Card.Body>
												<Card.Title style={{
													fontWeight: '800',
													height: '60px',
													fontSize: '17px'}}>{product.name}</Card.Title>
												<Card.Subtitle>{product.description}</Card.Subtitle>
												<Card.Text>PhP {product.price}</Card.Text>

												{(function(){
													if(user.id !== null && user.isAdmin === false){
														return (
														<React.Fragment>
															<Button style={{ 
																backgroundColor: 'transparent',
																color: 'rgb(93, 70, 50)',
																fontWeight: '800',
																marginRight: '10px',
																borderColor: 'rgb(93, 70, 50)' }}
																size="sm"
																onClick={() => addToCart(product._id, 1)}
																>Add to cart
															</Button>
															<Button style={{ 
																backgroundColor: 'transparent',
																fontWeight: '800',
																color: 'rgb(93, 70, 50)',
																borderColor: 'rgb(93, 70, 50)' }}
																size="sm" 
																as={Link} to={`/products/${product._id}`}>Details
															</Button>
														</React.Fragment>
														)
													} else if(user.id !== null && user.isAdmin === true){
														return (
															<Button style={{ 
																backgroundColor: 'transparent',
																fontWeight: '800',
																color: 'rgb(93, 70, 50)',
																borderColor: 'rgb(93, 70, 50)' }}
																size="sm" 
																as={Link} to={`/products/${product._id}`}>View
															</Button>
														)
													} else {
														return (
														<React.Fragment>
															<Button style={{ 
																backgroundColor: 'transparent',
																color: 'rgb(93, 70, 50)',
																fontWeight: '800',
																marginRight: '10px',
																borderColor: 'rgb(93, 70, 50)' }}
																size="sm" 
																as={Link} to="/login">Log in
															</Button>
															<Button style={{ 
																backgroundColor: 'transparent',
																color: 'rgb(93, 70, 50)',
																fontWeight: '800',
																borderColor: 'rgb(93, 70, 50)' }}
																size="sm" 
																as={Link} to={`/products/${product._id}`}>Details
															</Button>
														</React.Fragment>
														)
													}
												})()}
											</Card.Body>
										</Card>
								</Grid>
							)
						})}
					</Grid>
				</Fragment>

	)
}
