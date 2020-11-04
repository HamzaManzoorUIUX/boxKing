import React,{useState} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {repository} from '../utils/repository';
import {useSelector,useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import actionMethodes from '../../redux/actionMethodes/cartActionsTypes';
import {useHistory} from 'react-router-dom';
import ClipLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
let cstErrors;

const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    phonenumber: Yup.string()
  .required('Required'),
    password: Yup.string()
  .required('Required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
email: Yup.string()
  .required('Required').email(),
confirmPassword: Yup.string()
  .required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),

});
export default () =>
{
  const [loaderMain,setloaderMain]=useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("Opps Something wen't wrong");
    const [errorDsp,seterrorDsp]=useState(false);
    const dispatch=useDispatch();
    const history=useHistory();
    const postCat = async (datapost) => {
        seterrorDsp(true);
        setloaderMain(true);

        const { data, status } = await repository.checkUserEmail(datapost.email).then(x => x).then(x => x)
    
        try {
          if (status != 200) {
            setOpen(true)

          }
          else {

                if(data==1)
                {
                    cstErrors.email = "Email already in use";
                setOpen(true)
              setMessage("Error! Email already in use")
                }
                else
                {
                    const { data, status } = await repository.postUser(datapost).then(x => x).then(x => x);
    
                    if (status != 200) {
                      setOpen(true)
                      
                    }
                    else {
                        dispatch({type:actionMethodes.login,payload:{...data,role:'user'}});
                        history.replace('/');
                        
                      return true;
                    }
                }
           
           
          }
    
         
          seterrorDsp(false);
          setloaderMain(false);

          return false;
        }
        catch
        {
          setOpen(true)
        }
        seterrorDsp(false);
        setloaderMain(false);

        return false;
      }
return <>
         { loaderMain? <div className="sweet-loading" style={{position:'absolute',top:'50%',left:'50%'}}>
        <ClipLoader
          css={override}
          size={20}
          color={"#f9b541"}
          loading={true}
        />
      </div>: <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phonenumber: ''
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  await postCat(values)
                }}
            >
                {({ errors, touched, getFieldProps }) =>{
                                  cstErrors = errors;

                                return  (
                                     <Form>
                        
                                     <div className="container main">
                                             <div className="main-form">
                                                 <img src={require('../images/logo.png')} alt="Logo" className="logo" />
                                     
                                     
                                                 <section>
                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("name")} className="user-fields" type="text" id="name" placeholder="Enter your name"  />
                                                                     <label for="name" className="user-label">Full Name</label>
                                                                 </div>
                                                                 {touched.name && errors.name && <div style={{ color: 'red', marginTop: 10 }}>{errors.name}</div>}
                                     
                                     
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("email")} className="user-fields" type="text" id="Email" placeholder="Enter your email address" />
                                                                     <label for="email" className="user-label">Email</label>
                                                                 </div>
                                                                 {touched.email && errors.email && <div style={{ color: 'red', marginTop: 10 }}>{errors.email}</div>}
                                     
                                                                 <div className="input-field">
                                                                     <input {...getFieldProps("phonenumber")} className="user-fields" type="text" id="phone" placeholder="Enter your phone"  />
                                                                     <label for="phone" className="user-label">Mobile Number</label>
                                                                 </div>
                                                                 {touched.phonenumber && errors.phonenumber && <div style={{ color: 'red', marginTop: 10 }}>{errors.phonenumber}</div>}
                                     
                                                                 <div className="input-field">
                                                                     <input {...getFieldProps("password")} className="user-fields" type="text" id="Password" placeholder="Enter your password" />
                                                                     <label for="Password" className="user-label">Password</label>
                                                                 </div>
                                                                 {touched.password && errors.password && <div style={{ color: 'red', marginTop: 10 }}>{errors.password}</div>}
                                     
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("confirmPassword")} className="user-fields" type="text" id="Repeat-Password" placeholder="Repeat your password"  />
                                                                     <label for="Repeat-Password" className="user-label">Repeat-Password</label>
                                                                 </div>
                                                                 {touched.confirmPassword && errors.confirmPassword && <div style={{ color: 'red', marginTop: 10 }}>{errors.confirmPassword}</div>}
                  
                                                 </section>
                                                 <button disabled={(errorDsp==true?true:false)} type="submit" className="submit-button">REGISTER</button>
                  
                                                 <div className="frgt-rmb">
                                                     <div className="form-check">
                                                         <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                         <label className="form-check-label">Remember Me</label>
                                                     </div>
                                                     <a> Forgot Password</a>
                                                 </div>
                                             </div>
                                          
                                             <div className="showBar">
                                                 <div className="line1"><hr /></div>
                                                 <div className="line-text"><p>or</p></div>
                                                 <div className="line2"><hr /></div>
                                     
                                             </div>
                                             <div>
                                                 <a href="" className="page-link1">Don,t have an account ?</a>
                                             </div>
                                         </div>
                                     
                                     </Form>
                                  )

                } }
            </Formik>
            }
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