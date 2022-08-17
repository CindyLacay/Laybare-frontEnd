import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import UserContext from "../UserContext";

export default function ProductView(){

    const { productId } = useParams();

    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch(`https://obscure-everglades-49200.herokuapp.com/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setName(data.name);
            setImage(data.image);
            setDescription(data.description);
            setPrice(data.price);
        })
    }, [productId]);

    return(
        <Container style={{
            marginTop: '100px',
            marginBottom: '100px',
            textAlign: 'center',
            fontFamily: 'Bitter',
            color: '#5D4632'
        }}>
            <Container>
                <img
                src={image}
                height="700px"
                width="500px"
                style={{ borderRadius: '20px' }}
                />
            </Container>
            <Card style={{ 
                border: "0px",
                paddingTop: '10px',
                marginTop: '20px',
                backgroundColor: 'transparent'
                }}>
                <Card.Body >
                    <Card.Title style={{ fontWeight: '800' }}>{name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: '10px' }}></Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>Php{price}</Card.Text>

                {user.isAdmin ?
                    <Button style={{ 
                        backgroundColor: 'transparent',
                        color: 'rgb(93, 70, 50)',
                        borderColor: 'rgb(93, 70, 50)' }} 
                        as={Link} to='/products/all'>Go back
                    </Button>
                    :
                    <Button style={{ 
                        backgroundColor: 'transparent',
                        color: 'rgb(93, 70, 50)',
                        borderColor: 'rgb(93, 70, 50)' }} 
                        as={Link} to='/products'>Go back
                    </Button>
                }
                    
                </Card.Body>
            </Card>
        </Container>
    )
}