import { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Title from '../title';
import { useNavigate } from "react-router-dom";

import { TableRow, TableFooter, TableCell } from '@mui/material';

function Model(props) {

    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [subtitle, setSubtitle] = useState("");

    useEffect(() => {

      let id, path, limit = -1;

      if (props.id){
        id = props.id;
        limit = 5;
      }
      else {
        path = window.location.pathname.split("/");
        id = path[path.length - 1];
      }

      fetch(`http://localhost:3000/store_inventories.json?model_id=${id}&order=desc&limit=${limit}`)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          setData(data);
          setSubtitle(`for ${data[0]["product_name"]}`);
        })
      .catch(function(error) {

      });
    }, [props.refresh])
    
    const columns = [
        {
            name: "store_id",
            label: "Id",
            options: {
              display: false
            }
        },
        {
            name: "store_name",
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
    };    

    if (props.style == "minimal"){
      
      return (
        <>

          <TableRow>
            <TableCell></TableCell>
            <TableCell><b>Nearby Stores Availability</b></TableCell>
            <TableCell><b>Quantity</b></TableCell>
          </TableRow>

          {
            data.map((e) => (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>{e["store_name"]}</TableCell>
                <TableCell>{e["quantity"]}</TableCell>
              </TableRow>
            ))
          }


        </>
    )

    }
    else {

      return (
          <div className='p-4' style={{ }}>
              <Title text={`Availability ${subtitle}`} />
              <MUIDataTable
                  data={data}
                  columns={columns}
                  options={options}
              />
          </div>
      )

    }

}

export default Model;