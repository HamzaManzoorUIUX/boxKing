
import React,{useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Notice,Card, CardBody, CardHeader} from '../../../../_metronic/_partials/controls';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
import { repository} from '../../../../boxking/utils/repository';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';

import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";



 const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  description: Yup.string()
      .required('Required'),
  
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



export default function TextFields(props) {

  const { record } = props.location.state;
  const  [open,setOpen]=useState(false);
  const  [loader,setloader]=useState(false);
  const [image, setImage] = useState(record.image);

  const  [message,setMessage]=useState("Opps Something wen't wrong");

  const classes = useStyles();
  const postCat=async (datapost)=>{
    setloader(true);
    const {data,status}= await repository.updateCategory(datapost).then(x=>x).then(x=>x)
     try{
      if(status!=200)
      {

        setOpen(true)
        setMessage("Opps Something wen't wrong")
       }
      else
      {
          console.log(data)
        setOpen(true)
        setMessage("Success! Category Updated sucessfully")
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
        <span>Input All Required categories fields.</span>{" "}
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
      <CardHeader title="Product Category"/>
      <CardBody>
      <Formik
       initialValues={{
        name: record.name,
        id:record.id,
        imgChange:false,
        image: record.image,
        description:record.description
        
       }}
       validationSchema={DisplayingErrorMessagesSchema}
       onSubmit={ async (values, { setSubmitting }) =>{
         // same shape as initial values
        const val=await postCat(values);
       
        setSubmitting(false);      
       }}
     >
       {({ errors, touched,getFieldProps,setFieldValue }) => (
         <Form>
           <TextField
              name="name"
              id="standard-full-width"
                label="Input Category"
                style={{ margin: 8 }}
                placeholder="Category"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                {...getFieldProps("name")}
                
              />   
          
           {touched.name && errors.name && <div  style={{color:'red'}}>{errors.name}</div>}

           <TextField
                      name="description"
                      id="standard-full-width"
                      label="Input Description"
                      style={{ margin: 8 }}
                      placeholder="Description"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps("description")}

                    />
                    {touched.description && errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}

           <div style={{ display: 'flex' }}>
                      <TextField
                        name="img"
                        id="img"
                        label="Upload Image"
                        style={{ margin: 8, width: '74%' }}
                        placeholder="...."
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        readOnly
                        value={image}

                      />
                      <label htmlFor="upload-photo" style={{ paddingTop: 27 }}>
                        <input
                        accept="image/*"
                          style={{ display: "none" }}
                          id="upload-photo"
                          name="upload-photo"
                          type="file"
                          onChange={e => {
                            let file = e.target.files[0];
                            console.log(file)
                            let reader = new FileReader();
                            reader.onloadend = function () {
                              setFieldValue("image", reader.result)
                              setFieldValue("imgChange", true)
                              setImage(file.name)
                              
                              }

                            reader.readAsDataURL(file);

                          }

                          }

                        />
                        <Fab
                          color="secondary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload photo
      </Fab>
                      </label>
                    </div>

                    {touched.image && errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}


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
