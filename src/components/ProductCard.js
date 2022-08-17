import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function ProductCard({productProp}) {

    const {_id, name,image, description, price} = productProp;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP {price}</Card.Text>
                <Link className="btn btn-primary" to={`/products/${_id}`}>View Book</Link>
            </Card.Body>
        </Card>
    )
}


ProductCard.propTypes = {
    productProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}
