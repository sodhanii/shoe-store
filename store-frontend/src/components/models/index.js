import { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Title from '../title';

import { useNavigate } from "react-router-dom";

function Models(props) {
    
    let navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/models.json').then(function(response) {
            return response.json();
        }).then(function(data) {
            setData(data);
        }).catch(function(error) {

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
            label: "Product",
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
        },
        {
            name: "sales",
            label: "Sales",
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
        fixedSelectColumn: true,
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
            console.log("Row Data:", rowData, rowMeta);
            let rowId = rowData[0]
            navigate(`/models/${rowId}`);
        }
    };    

    return (

        <>
            <Title text="Model Sales" key="Product Sales" />
            <MUIDataTable
            data={data}
            columns={columns}
            options={options}
            />
        </>
    )

}

export default Models;