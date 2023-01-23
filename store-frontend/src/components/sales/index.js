import { useEffect, useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import SalesChart from '../salesChart';

function Sales() {

    const [key, setKey] = useState(0);
    const [data, setData] = useState(null);

    const handleReceived = (data) => {
        setData(data.data);
        setKey(k => k + 1); 
    }
    
    return (

        <ActionCableConsumer
            channel="SalesChannel"
            onReceived={handleReceived}>
            <SalesChart data={data} refresh={key} />
        </ActionCableConsumer>
    )

}

export default Sales;