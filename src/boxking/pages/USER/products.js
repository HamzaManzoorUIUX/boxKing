import Layout from './layout';
import React, { Component, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DataTable from 'react-data-table-component';
import { repository } from '../../../boxking/utils/repository';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal, Dropdown } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { urlImg } from '../../utils/baseUrl'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory, useLocation
} from "react-router-dom";
let idSelected = 0
let statusSelect = 0;

const customStyles = {
    rows: {
        style: {
            minHeight: '32px', // override the row height
        }
    },
    headCells: {
        style: {
            paddingLeft: '40px', // override the cell padding for head cells
            paddingRight: '40px',
            backgroundColor: '#EFEFEF', color: '#707070',
        },
    },
    cells: {
        style: {
           width:'100%'
        },
    },
};

export default (props) => {
    let history = useHistory();
    let location = useLocation();
    const updateRecord = async (id, statusx) => {
        setShowModal(false);
        const { data, status } = await repository.updateOrder(id, statusx).then(x => x).then(x => x);
        try {
            if (status != 200) {
                setOpen(true)
                setMessage("Opps Something wen't wrong")
            }
            else {
                setOpen(true)
                setMessage("Success! Order Updated sucessfully");
                const { data, status } = await repository.getOrders().then(x => x).then(x => x);
                if (status == 200) {
                    setDatax(data);

                }
            }

            setTimeout(() => {
                setOpen(false)
            }, 3000);
            setloader(false);

        }
        catch
        {
            setOpen(true)
            setMessage("Opps Something wen't wrong")
            setTimeout(() => {
                setOpen(false)
            }, 3000);
            setloader(false);
        }
    }
    const columns = [

        {
            name: 'Product',
            cell: (row) => {
            return    <div className="prdDispOrdr pt-5" >
                <img style={{ width: 50, height: 50 }} src={urlImg + "dist/img/upload/" + row.product.image} />
                <div><h3>{row.product.title}</h3>
                    <p>{row.product.shortdescription}</p>
                </div>
            </div>    
            },
            width:'30%'
        }
        ,
        {
            name: 'Print Run',
            selector:'printRun',
      }        ,
        {
            name: 'Quanity',
            selector:'quantity',
      }        ,
        ,
        {
            name: 'Total Amount',
            selector:'purchaseAmount',
      }        ,
        {
            name: 'Action',
            cell: (row) => <div className="tabDD">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        ...
          </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item  onClick={()=>history.push({pathname: '/user/OrderItem', state: {row}})}  >View</Dropdown.Item>
                       </Dropdown.Menu>
                </Dropdown>
            </div>
        }

    ];
    const [shoModel, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [loader, setloader] = useState(false);
    const [message, setMessage] = useState("Opps Something wen't wrong");

    const [datax, setDatax] = useState([]);
    const handleSelect = (id, status) => {
        setShowModal(true)
        idSelected = id;
        statusSelect = status;
    }
    useEffect(() => {

        console.log(location.state.row)
        setDatax(location.state.row.order_items);

    }, []);
    return (
        <>
            <div className="ldm-div">
                {loader ? <LinearProgress /> : <></>}
            </div>
            <Layout>
            <div className="printingHad">
        <p className="ml-2">All Products</p>
       <input type="text" className="form-control" style={{maxWidth:370}} placeholder="Search" />
    </div>
    <DataTable
        columns={columns}
        data={datax}
        pagination={true}
        customStyles={customStyles}
        noHeader={true}
        responsive={true}
        style={{marginTop:20}}
      />
                <Modal show={shoModel} onHide={setShowModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure!</Modal.Body>

                    <Modal.Footer>

                        <Button variant="primary" onClick={() => updateRecord(idSelected, statusSelect)} >
                            Confirm
      </Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancle
      </Button>
                    </Modal.Footer>
                </Modal>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={setOpen}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                />
            </Layout>
        </>

    )
};
