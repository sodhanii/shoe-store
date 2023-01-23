import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Title from '../title';
import Subtitle from "../subtitle";
import { useNavigate } from "react-router-dom";
import Model from '../model';

function Store(props) {

    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [subtitle, setSubtitle] = useState("");

    useEffect(() => {
        const path = window.location.pathname.split("/");
        const id = path[path.length - 1];
        fetch(`http://localhost:3000/store_inventories.json?store_id=${id}&order=asc`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setData(data);
            setSubtitle(`for ${data[0]["store_name"]}`);
        })
        .catch(function(error) {

        });
    }, [props.refresh])
    
    const columns = [
        {
            name: "model_id",
            label: "Id",
            options: {
              display: false
            }
        },
        {
            name: "product_name",
            label: "Model",
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
            name: "quantity",
            label: "Inventory",
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
        }
        // ,
        // {
        //     name: "low_products",
        //     label: "Inventory Alert (!)",
        //     options: {
        //         sort: true,
        //         setCellHeaderProps: value => {
        //             return {
        //                 style: {
        //                     paddingLeft: 0
        //                 },
        //             };
        //         },      
        //     }
        // }
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
        expandableRows: true,
        expandableRowsOnClick: true,
        renderExpandableRow: (rowData, rowMeta) => {
            
            let productId = rowData[0];
            console.log("ProductId:", productId, "rowData", rowData)
            return (
                <React.Fragment>
                    <Model id={productId} style="minimal"/>
                </React.Fragment>
            );
        }

    };

    return (
        <div className='p-4'>
            <Title text={`Store Inventory ${subtitle}`} />
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )

}

export default Store;