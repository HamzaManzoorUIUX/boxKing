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
import {urlImg} from '../../utils/baseUrl';
import {Accordion,Card} from 'react-bootstrap';
import {BsChevronCompactUp} from 'react-icons/bs';
import PasswordForm from './passWord';
import EmailForm from './uprofile'
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
        minHeight: '22px', // override the row height
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
        width:'100% '
      },
    },
  };
   
export default () => {
  let history = useHistory();
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
            if(row.order_items.length>0)
            {
                return <div className="prdDispOrdr mt-5">
                <img style={{width:50,height:50}} src={urlImg+"dist/img/upload/"+row.order_items[0].product.image}/>
                <div><h3>{row.order_items[0].product.title}</h3>
                <p>{row.order_items[0].product.shortdescription}</p>
                </div>
          </div>
            }
            else
            {
                return <p>No Products</p>
            }

          }
        }
        ,
        {
            name: 'Total Products',
        cell: (row) => <p>{row.order_items.length}</p>
          }
          ,
        {
            name: 'Order Status',
            cell: (row) => <p style={{color:'#F5AA75',display:'flex'}}><div style={{width:10,height:10,borderRadius:10,marginTop:3,marginRight:10,backgroundColor:'#F5AA75'}}></div>{row.orderStatus}</p>
          }
          ,
        {
            name: 'Total Amount',
            selector:'subTotal',
      }
          ,
        {
          name: 'Action',
          cell: (row) =><div className="tabDD">
              <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
           ...
          </Dropdown.Toggle>
        
          <Dropdown.Menu>
        <Dropdown.Item onClick={()=>handleSelect(row.id,(row.orderStatus=="Panding"?0:1))} >{(row.orderStatus=="Panding"?"Mark Complete":'Mark Panding')}</Dropdown.Item>
            <Dropdown.Item onClick={()=>history.push({pathname: '/printing/OrderItems', state: {row}})} >View</Dropdown.Item>
            <Dropdown.Item onClick={()=>handleSelect(row.id,2)}>Cancel</Dropdown.Item>
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
  const handleSelect=(id,status)=>{
    setShowModal(true)
    idSelected=id;
    statusSelect=status;
  }
  useEffect(() => {
    const categories = async () => {
      const { data, status } = await repository.getOrders().then(x => x).then(x => x);
      console.log("orders",data)
      if (status == 200) {
        setDatax(data);

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
        <p>Settings</p>
    </div>
    <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header style={{backgroundColor:'white'}}>
      <Accordion.Toggle as={Button} style={{width:'100%',paddingTop:20}} variant="link" eventKey="0">
        <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
          <div>
            <p style={{fontFamily: 'Ruda',fontWeight:'bold',fontSize:16,color:'#656768'}}>Cpmpany Profile</p>
          </div>
          <div>
          <BsChevronCompactUp />
          </div>
        </div>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      <EmailForm/>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header style={{backgroundColor:'white'}}>
      <Accordion.Toggle as={Button} style={{width:'100%',paddingTop:20}} variant="link" eventKey="1">
        <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
          <div>
            <p style={{fontFamily: 'Ruda',fontWeight:'bold',fontSize:16,color:'#656768'}}>Security Settings</p>
          </div>
          <div>
          <BsChevronCompactUp />
          </div>
        </div>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        <PasswordForm/>
   </Card.Body>
    </Accordion.Collapse>
  </Card>
  
  </Accordion>
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
