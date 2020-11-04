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
    
    premiumshipping: Yup.string()
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
          
        const { data, status } = await repository.updatePrintingCompany({...datapost,"changep":true}
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
        id:Auth.id,
        email:Auth.email,
        CompanyName: Auth.CompanyName,
        PhoneNumber: Auth.PhoneNumber,
        Country: Auth.Country,
        Fax: Auth.Fax,
        State: Auth.State,
        lat: Auth.lat,
        long: Auth.long,
        address: Auth.address,
        premiumshipping: Auth.premiumshipping,

        
        
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
            <input type="text"  {...getFieldProps("CompanyName")} readOnly
 className="form-control" style={{height:56,marginBottom:16}} placeholder="name" />
          {touched.CompanyName && errors.CompanyName && <div style={{ color: 'red' }}>{errors.CompanyName}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("PhoneNumber")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="PhoneNumber" />
           {touched.PhoneNumber && errors.PhoneNumber && <div style={{ color: 'red' }}>{errors.PhoneNumber}</div>}

          </div>
         
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("Country")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Country" />
           {touched.Country && errors.Country && <div style={{ color: 'red' }}>{errors.Country}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("Fax")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Fax" />
           {touched.Fax && errors.Fax && <div style={{ color: 'red' }}>{errors.Fax}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("State")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="State" />
           {touched.State && errors.State && <div style={{ color: 'red' }}>{errors.State}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("premiumshipping")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Premium Shipping" />
           {touched.premiumshipping && errors.premiumshipping && <div style={{ color: 'red' }}>{errors.premiumshipping}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("lat")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Lat" />
           {touched.lat && errors.lat && <div style={{ color: 'red' }}>{errors.lat}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("long")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Long" />
           {touched.long && errors.long && <div style={{ color: 'red' }}>{errors.long}</div>}

          </div>
          <div className="col-md-12">
            <textarea type="text" row={10}  {...getFieldProps("address")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Addrees" >

 </textarea>
           {touched.address && errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}

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