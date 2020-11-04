import React,{useState} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {repository} from '../../utils/repository';
import {useSelector,useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import actionMethodes from '../../../redux/actionMethodes/cartActionsTypes';
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
  CompanyName: Yup.string()
    .required('Required'),
      password: Yup.string()
  ,PhoneNumber: Yup.string()
    .required('Required'),
  premiumshipping: Yup.string()
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

  /*
   .max(50, 'Too Long!')
   .required('Required'),
 email: Yup.string()
   .email('Invalid email')
   .required('Required'),
   */
});

export default () =>
{
    const [open, setOpen] = useState(false);
    const [loader, setloader] = useState(false);
    const [message, setMessage] = useState("Opps Something wen't wrong");
    const [loaderMain,setloaderMain]=useState(false);

    const dispatch=useDispatch();
    const history=useHistory();
      const postCat = async (datapost) => {
        setloaderMain(true);

    setloader(true);
    const { data, status } = await repository.checkUniqe(datapost).then(x => x).then(x => x)

    try {
      if (status != 200) {
        setOpen(true)
        setMessage("Opps Something wen't wrong")
      }
      else {
        if (data[0] == 1) {
          cstErrors.CompanyName = "Company already in use"
          setOpen(true)
          setMessage("Error! Company already in use")
        }
        if (data[2] == 1) {
          cstErrors.email = "Email already in use"
          setOpen(true)
          setMessage("Error! Email already in use")
        }

        if (!data.includes(1)) {
          const { data, status } = await repository.postCompany(datapost).then(x => x).then(x => x);

          if (status != 200) {
            setOpen(true)
            setMessage("Opps Something wen't wrong")
          }
          else {
            dispatch({type:actionMethodes.login,payload:{...data,role:'printing'}});
            history.replace('/')
            setOpen(true)
           // setMessage("Success! Company added sucessfully")
            setTimeout(() => {
              setOpen(false)
            }, 3000);
            setloader(false);

            return true;
          }
        }

        // setOpen(true)
        //setMessage("Success! Category added sucessfully")
      }
      setloaderMain(false);

      setTimeout(() => {
        setOpen(false)
      }, 3000);
      setloader(false);

      return false;
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
    setloaderMain(false);
    return false;
  }
return <>
         {
        loaderMain? <div className="sweet-loading" style={{position:'absolute',top:'50%',left:'50%'}}>
        <ClipLoader
          css={override}
          size={20}
          color={"#f9b541"}
          loading={true}
        />
      </div>: <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    CompanyName: '',
                    PhoneNumber: '',
                    Country: '',
                    Fax: '',
                    State: '',
                    lat: '',
                    long: '',
                    address: '',
                    premiumshipping: '',
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
                                                 <img src={require('../../images/logo.png')} alt="Logo" className="logo" />
                                     
                                     
                                                 <section>
                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("CompanyName")} className="user-fields" type="text" id="name" placeholder="Enter your Company name"  />
                                                                     <label for="name" className="user-label">Company Name</label>
                                                                 </div>
                                                                 {touched.CompanyName && errors.CompanyName && <div style={{ color: 'red', marginTop: 10 }}>{errors.CompanyName}</div>}
                                     
                                     
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("email")} className="user-fields" type="text" id="Email" placeholder="Enter your email address" />
                                                                     <label for="email" className="user-label">Email</label>
                                                                 </div>
                                                                 {touched.email && errors.email && <div style={{ color: 'red', marginTop: 10 }}>{errors.email}</div>}
                                     
                                                                 <div className="input-field">
                                                                     <input {...getFieldProps("PhoneNumber")} className="user-fields" type="text" id="phone" placeholder="Enter your phone"  />
                                                                     <label for="phone" className="user-label">Mobile Number</label>
                                                                 </div>
                                                                 {touched.PhoneNumber && errors.PhoneNumber && <div style={{ color: 'red', marginTop: 10 }}>{errors.phonenumber}</div>}
                                     
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
                  
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("Country")} className="user-fields" type="text" id="Repeat-Password" placeholder="Country"  />
                                                                     <label for="Repeat-Password" className="user-label">Country</label>
                                                                 </div>
                                                                 {touched.Country && errors.Country && <div style={{ color: 'red', marginTop: 10 }}>{errors.Country}</div>}
                  
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("Fax")} className="user-fields" type="text" id="Repeat-Password" placeholder="Fax"  />
                                                                     <label for="Repeat-Password" className="user-label">Fax</label>
                                                                 </div>
                                                                 {touched.Fax && errors.Fax && <div style={{ color: 'red', marginTop: 10 }}>{errors.Fax}</div>}
                  
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("State")} className="user-fields" type="text" id="Repeat-Password" placeholder="Input State"  />
                                                                     <label for="Repeat-Password" className="user-label">State</label>
                                                                 </div>
                                                                 {touched.State && errors.State && <div style={{ color: 'red', marginTop: 10 }}>{errors.State}</div>}
                  
                  
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("premiumshipping")} className="user-fields" type="text" id="premiumshipping" placeholder="Input Premium Shipping"  />
                                                                     <label for="premiumshipping" className="user-label">Premium Shipping Amount</label>
                                                                 </div>
                                                                 {touched.premiumshipping && errors.premiumshipping && <div style={{ color: 'red', marginTop: 10 }}>{errors.premiumshipping}</div>}
                  
                  
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("lat")} className="user-fields" type="text" id="Repeat-Password" placeholder="Input State"  />
                                                                     <label for="Repeat-Password" className="user-label">Latitude</label>
                                                                 </div>
                                                                 {touched.lat && errors.lat && <div style={{ color: 'red', marginTop: 10 }}>{errors.State}</div>}
                  
                  
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("long")} className="user-fields" type="text" id="Repeat-Password" placeholder="Input State"  />
                                                                     <label for="Repeat-Password" className="user-label">Longitude</label>
                                                                 </div>
                                                                 {touched.long && errors.long && <div style={{ color: 'red', marginTop: 10 }}>{errors.long}</div>}
                  
                  
                                 
                  
                                                                 <div className="input-field">
                                                                     <input  {...getFieldProps("address")} className="user-fields" type="text" id="Repeat-Password" placeholder="Input address"  />
                                                                     <label for="Repeat-Password" className="user-label">Address</label>
                                                                 </div>
                                                                 {touched.address && errors.address && <div style={{ color: 'red', marginTop: 10 }}>{errors.address}</div>}
                  
                                                 </section>
                                                 <button disabled={loader} type="submit" className="submit-button">REGISTER</button>
                  
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
                                                 <a onClick={()=>history.push('/printing/login')} className="page-link1">Login</a>
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