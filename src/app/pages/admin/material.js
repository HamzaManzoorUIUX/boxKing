
import React,{useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Notice,Card, CardBody, CardHeader} from '../../../_metronic/_partials/controls';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
import { repository} from '../../../boxking/utils/repository';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';

 const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    ,extraamount: Yup.string()
    .required('Required')
   /*
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    */
});
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));



export default function TextFields() {

  const  [open,setOpen]=useState(false);
  const  [loader,setloader]=useState(false);

  const  [message,setMessage]=useState("Opps Something wen't wrong");

  const classes = useStyles();
  const postCat=async (datapost)=>{
    setloader(true);
    const {data,status}= await repository.postmaterial(datapost).then(x=>x).then(x=>x)
     try{
      if(status!=200)
      {
        setOpen(true)
        setMessage("Opps Something wen't wrong")
       }
      else
      {
        setOpen(true)
        setMessage("Success! Finishing added sucessfully")
      }

      setTimeout(() => {
        setOpen(false)
      }, 3000);
      setloader(false);

      if(status==200)
      {
        return  true;

      }
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
      return false;
  }
  return (
    <>
    <div className="ldm-div">
          {loader?<LinearProgress  />:<></>}
</div>
<Notice icon="flaticon-warning font-primary">
        <span>Input All Required fields.</span>{" "}
        <span>
          For more info please contact devlopers{" "}
          <a
            target="_blank"
            className="font-weight-bold"
            rel="noopener noreferrer"
            href="http://www.block-band.com/"
          >
            Developers Website
          </a>
        </span>
      </Notice>
      <div className="row">
      <div className="col-md-6">
      <Card className="example example-compact">
      <CardHeader title="Material"/>
      <CardBody>
      <Formik
        initialValues={{
          name: '',
          extraamount: '',
         }}
       validationSchema={DisplayingErrorMessagesSchema}
       onSubmit={ async (values, { setSubmitting }) =>{
         // same shape as initial values
        const val=await postCat(values);
        console.log(val)
        if(val==true)
        {
          values.name="";
        }
        setSubmitting(false);      
       }}
     >
       {({ errors, touched,getFieldProps }) => (
         <Form>
           <TextField
              name="name"
              id="standard-full-width"
                label="Input Title"
                style={{ margin: 8 }}
                placeholder="Title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                {...getFieldProps("name")}
                
              />   
          
           {touched.name && errors.name && <div  style={{color:'red'}}>{errors.name}</div>}
           <TextField
              name="extraamount"
              id="standard-full-width"
                label="Input Extra Amount"
                style={{ margin: 8 }}
                placeholder="Extra Amount"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                {...getFieldProps("extraamount")}
                
              />   
          
           {touched.extraamount && errors.extraamount && <div  style={{color:'red'}}>{errors.extraamount}</div>}
           
           <Button disabled={loader } style={{marginLeft:'85%',marginTop:10,color:'white'}} type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
      </Button>

      
         </Form>
       )}
     </Formik>
 </CardBody>
        </Card>
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
      </div>
    </>
    );
}
