import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { repository } from '../utils/repository';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import actionMethodes from '../../redux/actionMethodes/cartActionsTypes';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
let cstErrors;

const DisplayingErrorMessagesSchema = Yup.object().shape({

    password: Yup.string()
        .required('Required').matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    email: Yup.string()
        .required('Required').email(),
});

export default () => {

    const [loaderMain,setloaderMain]=useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("Opps Something wen't wrong");
    const [errorDsp, seterrorDsp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const postCat = async (datapost) => {

        setloaderMain(true);
        seterrorDsp(true)
        const { data, status } = await repository.loginuser(datapost.email, datapost.password).then(x => x).then(x => x)

        try {
            if (status != 200) {
                if (status == 401) {
                    setMessage("Username or password is incorrect");
                }
                setOpen(true)

            }
            else {

                dispatch({ type: actionMethodes.login, payload: { ...data, role: 'user' } });
                history.replace('/')

                // setOpen(true)
                //setMessage("Success! Category added sucessfully")
            }


            seterrorDsp(false);

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
    {
        loaderMain? <div className="sweet-loading" style={{position:'absolute',top:'50%',left:'50%'}}>
        <ClipLoader
          css={override}
          size={20}
          color={"#f9b541"}
          loading={true}
        />
      </div>:  <Formik
            initialValues={{

                email: '',
                password: '',
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={async (values, { setSubmitting }) => {
                await postCat(values)
            }}
        >
            {({ errors, touched, getFieldProps }) => {
                cstErrors = errors;

                return (
                    <Form>

                        <div className="container main">
                            <div className="main-form">
                                <img src={require('../images/logo.png')} alt="Logo" className="logo" />


                                <section className="bg-white rounded">
<h1 className="text-themeOrange text-center my-3 my-md-5">Login</h1>

                                    <div className="form-group form-group-email">
                                        <input  {...getFieldProps("email")} className="form-control" type="text" id="Email" placeholder="Enter your email address" />
                                        {/* <label for="email" className="user-label">Email</label> */}
                                    </div>
                                    {touched.email && errors.email && <div style={{ color: 'red', marginTop: 10 }}>{errors.email}</div>}


                                    <div className="from-group form-group-password">
                                        <input {...getFieldProps("password")} className="form-control" type="text" id="Password" placeholder="Enter your password" />
                                        {/* <label for="Password" className="form-control bg-white">Password</label> */}
                                    </div>
                                    {touched.password && errors.password && <div style={{ color: 'red', marginTop: 10 }}>{errors.password}</div>}
                                    <div className="frgt-rmb">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label">Remember Me</label>
                                    </div>
                                    <a> Forgot Password</a>
                                </div>
                                <button disabled={(errorDsp == true ? true : false)} type="submit" className="submit-button">Login</button>
                                <div>
                                <Link to="/register" className="page-link1">Don,t have an account ?</Link>
                                <br />
                                <Link to="/admin/auth/login" className="page-link1">Login as Admin</Link>
                            </div>
                                </section>

                                
                            </div>

               
                            

                        </div>

                    </Form>
                )

            }}
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