import React,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { repository } from '../../utils/repository';
import {useSelector,useDispatch} from 'react-redux';
import actionMethodes from '../../../redux/actionMethodes/cartActionsTypes';
import Snackbar from '@material-ui/core/Snackbar';

let cstErrors;
const DisplayingErrorMessagesSchema = Yup.object().shape({
      name: Yup.string()
    .required('Required'),
    phonenumber: Yup.string()
    .required('Required'),
    
  
  /*
   .max(50, 'Too Long!')
   .required('Required'),
 email: Yup.string()
   .email('Invalid email')
   .required('Required'),
   */
});
export default ()=>{

    const Auth=useSelector(x=>x.auth);
    const [open, setOpen] = useState(false);
    const [loader, setloader] = useState(false);
    const dispatch=useDispatch();
    const [message, setMessage] = useState("Opps Something wen't wrong");
    const postCat = async (datapost) => {
        setloader(true);
        
    
        try {
          
        const { data, status } = await repository.updateUser({...datapost,"changep":true}
        ).then(x => x).then(x => x);

          if (status != 200) {
            setOpen(true)
            setMessage("Opps Something wen't wrong");

          }
          else {
            setMessage("Success! User Updated successfully")
            setOpen(true)
           //dispatch({type:actionMethodes.login,payload:{...data,role:'user'}});

            setTimeout(() => {
                setOpen(false)
              }, 3000);
              setloader(false);
    
            // setOpen(true)
            //setMessage("Success! Category added sucessfully")
          }
    
          setTimeout(() => {
            setOpen(false)
          }, 3000);
          setloader(false);
    
          return false;
        }
        catch(e)
        {
            console.log("err",e)
          setOpen(true)
          setMessage("Opps Something wen't wrong")
         
        }
        return false;
      }
    return <>
     <Formik
    initialValues={{
        phonenumber: Auth.phonenumber,
        name: Auth.name,
        id:Auth.id,
        email:Auth.email
        
    }}
    validationSchema={DisplayingErrorMessagesSchema}
    onSubmit={async (values, { setSubmitting }) => {
      // same shape as initial values
      const val = await postCat(values);
      setSubmitting(false);
    }}
  >
    {({ errors, touched, getFieldProps }) => {
      cstErrors = errors;
      return (
        <Form>

<div className="row">
          <div className="col-md-6">
            <input type="text"  
 className="form-control" style={{height:56,marginBottom:16}} value={Auth.email} readOnly />
           
          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("name")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="name" />
          {touched.name && errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("phonenumber")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="phonenumber" />
           {touched.phonenumber && errors.phonenumber && <div style={{ color: 'red' }}>{errors.phonenumber}</div>}

          </div>


        </div>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button type="submit" disabled={loader} className="btn" style={{width: 123,height: 42,background: '#F5AA75',color:'white'}} >Update</button>
        </div>
        
        </Form>

      )
    }}
  </Formik>
   <Snackbar
   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
   open={open}
   onClose={setOpen}
   ContentProps={{
     'aria-describedby': 'message-id',
   }}
   message={<span id="message-id">{message}</span>}
 />
 
    </>
    

}