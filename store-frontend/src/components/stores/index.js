import { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Title from '../title';
import { useNavigate } from "react-router-dom";

function Stores(props) {

    let navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/stores.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setData(data);
        })
        .catch(function(error) {

        });
    }, [props.refresh])
    
    const columns = [
        {
            name: "id",
            label: "Id",
            options: {
              display: false
            }
        },
        {
            name: "name",
            label: "Store",
            options: {
                filter: false,
                sort: true,
                setCellHeaderProps: value => {
                    return {
                        style: {
                            paddingLeft: 0
                        },
                    };
                },  
            }
        },
        {
            name: "sales",
            label: "SALES",
            options: {
                filter: false,
                sort: false,
                setCellHeaderProps: value => {
                    return {
                    style: {
                        paddingLeft: 0
                    },
                    };
                },  
            }
        },
        {
            name: "low_products",
            label: "Inventory Alert (!)",
            options: {
                sort: true,
                setCellHeaderProps: value => {
                    return {
                        style: {
                            paddingLeft: 0
                        },
                    };
                },      
            }
        }
    ];
    
    const options = {
        fixedHeader: true,
        filter: false,
        selectToolbarPlacement: 'none',
        elevation: 0,
        fixedSelectColumn: false,
        pagination: false,
        search: false,
        print: false,
        selectableRows: 'none',
        viewColumns: false,
        download: false,
        tableBodyHeight: '500px',
        onRowClick: (rowData, rowMeta) => {
            let rowId = rowData[0]
            navigate(`/stores/${rowId}`);
        }
    };    

    return (
        <>
            <Title text="Store Sales" />
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
            />
        </>
    )

}

export default Stores;