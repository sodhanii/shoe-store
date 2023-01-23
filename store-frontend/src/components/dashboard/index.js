import { useEffect, useState } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Stores from '../stores';
import Models from '../models';
import SalesChart from '../salesChart';
import { Outlet } from "react-router-dom";
import { ACTION_CABLE_URL } from '../constants';

function Dashboard() {

    const [key, setKey] = useState(0);
    
    const handleReceived = (data) => {
        console.log("data received:");
        setKey(k => k + 1); 
    }

    useEffect(() => {

        let ws = new WebSocket(ACTION_CABLE_URL);

        ws.onopen = function(){
          //Subscribe to the channel
          ws.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"SalesChannel\"}"}))
        }    
        
        ws.onmessage = handleReceived;

    }, []);


    return ( 
        <>
            <Container className = "p-4 pt-2 mb-4" >
                <Row>
                    <Col className = "p-2">
                        <div className='shadow p-4 bg-white'>
                            <SalesChart refresh={key} />
                        </div>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col className = "p-2">
                        <div className='shadow p-4 bg-white'>
                            <Stores refresh={key} />
                        </div>
                    </Col>
                    <Col className = "p-2">
                        <div className='shadow p-4 bg-white'>
                            <Models refresh={key} />
                        </div>
                    </Col>
                </Row>        
            </Container>
            <Outlet />
        </>
    );

}

export default Dashboard;