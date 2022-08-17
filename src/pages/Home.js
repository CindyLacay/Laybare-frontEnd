import React, { Fragment } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import youngAdult from '../assets/young-adult.png';
import logo3 from '../assets/logo3.png';



export default function Home(){

	return (
		<Fragment>
			<Row>
				<Col className="banner">
					<Container className="mx-auto d-none d-md-block">
						<img
						src={youngAdult}
						alt="Homepage"
						style={{
							width: '100%',
							maxWidth: '700px',
							height: 'auto',
							borderRadius: '50px'
						}}
						/>
					</Container>
					<Container>
						<img
						src={logo3}
						alt="Homepage"
						style={{
							width: '50%',
							height: '45%',
						}}
						/>
						<h3 className="pb-4">#ConfidenceInAClick</h3>
						<Button style={{ 
                                    backgroundColor: 'transparent',
                                    color: 'rgb(93, 70, 50)',
                                    textTransform: 'capitalize',
									fontWeight: '800',
                                    borderColor: 'rgb(93, 70, 50)' }} as={Link} to="/products">Let's go!
						</Button>
					</Container>
				</Col>
			</Row>
			
		</Fragment>
	)
}