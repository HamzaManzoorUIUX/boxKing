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
import {Modal,Dropdown} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import {urlImg} from '../../utils/baseUrl'
import _ from 'lodash';
import {useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,useHistory
} from "react-router-dom";
let idSelected=0
let statusSelect=0;

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
        backgroundColor:'#EFEFEF',color: '#707070',
      },
    },
    cells: {
      style: {
        width:'100%'
      },
    },
  };
   
export default () => {
  let history = useHistory();
  const user=useSelector(x=>x.auth);

  const updateRecord=async (id,statusx)=>{
    setShowModal(false);
    const {data,status} =await repository.updateOrder(id,statusx).then(x=>x).then(x=>x);
    try {
      if (status != 200) {
        setOpen(true)
        setMessage("Opps Something wen't wrong")
      }
      else {
        setOpen(true)
        setMessage("Success! Order Updated sucessfully");
        const { data, status } = await repository.getOrdersbyPrinting(user.id).then(x => x).then(x => x);
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
            name: 'Name',
            width	:'340px',
            cell: (row) => {
                return    <div className="prdDispOrdr pt-2" >
                    <img style={{ width: 50, height: 50 ,borderRadius:50}} src="https://thenewstoday.com.pk/wp-content/uploads/2019/09/No_Image_Available.jpg" />
                    <div><h3>{row.users[0].user.name}</h3>
                        <p>{row.users[0].user.email}</p>
                    </div>
                </div>    
                }
      },
        {
            name: 'Phone Number',
            cell: (row) => {
            return   <p>00-95-3276466</p>
                }
      },
      
        {
            name: 'Last Order',
            cell: (row) => {
                const lastDate=_.last(row.users).created_at;
               // console.log(lastDate);
            return   <p>{lastDate}</p>
                }
      },
      
        {
            name: 'Runing Orders',
            cell: (row) => {
             const countx=   _.countBy(row.users, o =>{
                    return  o.orderStatus =="Pending";
                }).true;
            return   <p>{(countx?countx:0)}</p>
                }
      },{
        name: 'Total',
        cell: (row) => {
          
        return   <p>{row.users.length}</p>
            }
  }
        
      
      ];
  const [shoModel, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [message, setMessage] = useState("Opps Something wen't wrong");

  const [datax, setDatax] = useState([]);
  const handleSelect=(id,status)=>{
    setShowModal(true)
    idSelected=id;
    statusSelect=status;
  }
  useEffect(() => {
    const categories = async () => {
      const { data, status } = await repository.getOrdersbyPrinting(user.id).then(x => x).then(x => x);
      console.log("orders",data)
      if (status == 200) {
        const newUserData= _.chain(data)
        // Group the elements of Array based on `color` property
        .groupBy("userId")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => ({ userId: key, users: value }))
        .value();
        console.log(
           newUserData
          );
        setDatax(newUserData);

      }

    }
    categories();


  }, []);
  return (
   <>
    <div className="ldm-div">
    {loader ? <LinearProgress /> : <></>}
  </div>
    <Layout>
    <div className="printingHad">
        <p className="ml-2">All Customers</p>
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
        
      <Button variant="primary" onClick={()=>updateRecord(idSelected,statusSelect)} >
            Confirm
      </Button>
          <Button variant="secondary"  onClick={()=>setShowModal(false)}>
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
