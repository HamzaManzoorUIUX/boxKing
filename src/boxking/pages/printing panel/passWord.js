import React,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { repository } from '../../utils/repository';
import {useSelector,useDispatch} from 'react-redux';
import actionMethodes from '../../../redux/actionMethodes/cartActionsTypes';
import Snackbar from '@material-ui/core/Snackbar';

let cstErrors;
const DisplayingErrorMessagesSchema = Yup.object().shape({
      password: Yup.string()
    .required('Required').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
    newpassword: Yup.string()
    .required('Required').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
    newcpassword: Yup.string()
    .required('Required').oneOf([Yup.ref('newpassword'), null], 'Passwords must match'),

  
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
            let dataFinal={...Auth};
            dataFinal.oldpassword=datapost.password;
            dataFinal.password=datapost.newpassword;
            console.log("ddfinal",dataFinal)
        const { data, status } = await repository.updatePrintingCompany(dataFinal
        ).then(x => x).then(x => x);

          if (status != 200) {
            setOpen(true)
            setMessage("Opps Something wen't wrong");
            cstErrors.password = "Incorrect Password";

          }
          else {
            setMessage("Success! Password Updated successfully")
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
        password: '',
        newpassword: '',
        newcpassword: '',
    
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
            <input type="text"  {...getFieldProps("password")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Old Password" />
           {touched.password && errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("newpassword")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Password" />
          {touched.newpassword && errors.newpassword && <div style={{ color: 'red' }}>{errors.newpassword}</div>}

          </div>
          <div className="col-md-6">
            <input type="text"  {...getFieldProps("newcpassword")}
 className="form-control" style={{height:56,marginBottom:16}} placeholder="Confirm Phonenumber" />
           {touched.newcpassword && errors.newcpassword && <div style={{ color: 'red' }}>{errors.newcpassword}</div>}

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