import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Error(){

    return (
        <Row>
            <Col className="banner">
                <Container>
                    <h1 className="title">Error 404</h1>
                    <h3>Oops! It looks like you're lost.</h3>
                    <p><Link to="/">Let's get you back home.</Link></p>
                </Container>
            </Col>
        </Row>

    )
}