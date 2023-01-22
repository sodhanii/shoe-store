import { useEffect, useState } from 'react';

import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ActionCableConsumer } from 'react-actioncable-provider';

function Dashboard() {

    const handleReceived = (message) => {
        console.log("Message:", message);
    }

    return ( 
        <Container className = "mt-4" style = {{ height: "calc(100vh - 3rem)" }} >
        <Row style = {{ height: "100%" }} >
            <Col className='shadow'>
                    <ActionCableConsumer
                        channel="SalesChannel"
                        onReceived={handleReceived}>
                    </ActionCableConsumer>
            </Col> 
        </Row> 
        </Container>
    );

}

export default Dashboard;