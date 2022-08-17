import React, { Fragment, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Input, InputAdornment } from '@mui/material';
import moment from 'moment';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

export default function AllOrders() {

    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = () => {
		fetch('https://obscure-everglades-49200.herokuapp.com/users/orders', {
            headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
        })
		.then(res => res.json())
		.then(data => {
			setOrders(data)
		})
	}

	useEffect(() => {
			fetchOrders()
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
            >All Orders</h1>


			<Container style={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '10px'
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
                    minWidth: 700 }}
                className="table table-hover">
                    <thead
                        style={{
                            backgroundColor: '#5D4632',
                            color: 'white'
                        }}>
                        <tr>
                            <th>ID</th>
                            <th>User email</th>
                            <th>ProductID</th>
                            <th>Product Name</th>
                            <th>Date of Purchase</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.filter((order) => {
                            if (searchTerm === "") {
                                return orders;
                            } 
                            else if (order.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return order;
                            }
                            else if (order.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return order;
                            }
                            else if (order.purchasedOn.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                                return order;
                            }
                        })
                        .map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.email}</td>
                                    <td>{order.productId}</td>
                                    <td>{order.name}</td>
                                    <td>{moment(order.purchasedOn).format("MM-DD-YYYY")}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.totalAmount}</td>
                                </tr>
                                )
                        })}
                    </tbody>
                </Table>
            </Fragment>
    )
}