
import React, { Component, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Notice, Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import DataTable from 'react-data-table-component';
import { repository } from '../../../boxking/utils/repository';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Modal} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,useHistory
} from "react-router-dom";
let idSelected=0

export default () => {
  let history = useHistory();
  const deleteRecord=async (id)=>{
    setShowModal(false);
    const {data,status} =await repository.deletefinishing(id).then(x=>x).then(x=>x);
    try {
      if (status != 200) {
        setOpen(true)
        setMessage("Opps Something wen't wrong")
      }
      else {
        setOpen(true)
        setMessage("Success! Finishing deleted sucessfully");
        const { data, status } = await repository.getfinishings().then(x => x).then(x => x);
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
      name: 'id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    
    },
    {
      name: 'Extra Amount',
      selector: 'extraamount',
      sortable: true,
    }
    ,
    {
      name: 'Action',
      cell: (row) => <Grid item>
        <ButtonGroup variant="contained" size="small" aria-label="Small contained button group">
        <Button onClick={() => { history.push('/admin/edit/Finishing',{record:row}) }}>Update</Button>
          <Button onClick={()=>handleSelect(row.id)}>Delete</Button>
        </ButtonGroup>
      </Grid>
    }
  
  ];
  const [shoModel, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [message, setMessage] = useState("Opps Something wen't wrong");

  const [datax, setDatax] = useState([]);
  const handleSelect=(id)=>{
    setShowModal(true)
    idSelected=id;
  }
  useEffect(() => {
    const categories = async () => {
      const { data, status } = await repository.getfinishings().then(x => x).then(x => x);
      if (status == 200) {
        setDatax(data);

      }

    }
    categories();


  }, []);
  return (
    <div>
       <div className="ldm-div">
        {loader ? <LinearProgress /> : <></>}
      </div>
      <DataTable
        title="Finishings"
        columns={columns}
        data={datax}
        pagination={true}
      />
      <Modal show={shoModel} onHide={setShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure! it wan't revoke</Modal.Body>
        
      <Modal.Footer>
        
      <Button variant="primary" onClick={()=>deleteRecord(idSelected)} >
            Delete
      </Button>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
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
    </div>


  )
};
