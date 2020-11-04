
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Notice, Card, CardBody, CardHeader } from '../../../../_metronic/_partials/controls';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { repository } from '../../../../boxking/utils/repository';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';

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

  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);

  const [message, setMessage] = useState("Opps Something wen't wrong");

  const classes = useStyles();
  const postCat = async (datapost) => {
    setloader(true);
    const { data, status } = await repository.updatePrintingCompany(datapost).then(x => x).then(x => x);
    try {

      if (status != 200) {
        setOpen(true)
        setMessage("Opps Something wen't wrong")
      }
      else {
        setOpen(true)
        setMessage("Success! Company Updated sucessfully")
        setTimeout(() => {
          setOpen(false)
        }, 3000);
        setloader(false);

       
      }

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
    return false;
  }
  return (
    <>
      <div className="ldm-div">
        {loader ? <LinearProgress /> : <></>}
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
            <CardHeader title="Printing Company" />
            <CardBody>
              <Formik
                initialValues={{
                  email: record.email,
                  password: record.password,
                  confirmPassword: record.password,
                  CompanyName: record.CompanyName,
                  PhoneNumber: record.PhoneNumber,
                  Country: record.Country,
                  Fax: record.Fax,
                  State: record.State,
                  lat: record.lat,
                  long: record.long,
                  address: record.address,
                  premiumshipping: record.premiumshipping,
                  id:record.id
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
                      <TextField
                        name="CompanyName"
                        id="standard-full-width"
                        label="Input Company Name"
                        style={{ margin: 8 }}
                        placeholder="Swiss Pack PVT LTD"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("CompanyName")}

                      />
                      {touched.CompanyName && errors.CompanyName && <div style={{ color: 'red' }}>{errors.CompanyName}</div>}

                      <TextField
                        name="email"
                        id="email"
                        label="Input Email"
                        style={{ margin: 8 }}
                        placeholder="example@compnayemail.com"
                        fullWidth
                        margin="normal"
                        readonly
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("email")}

                      />

                      {touched.email && errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                      <TextField
                        name="password"
                        id="password"
                        label="Input Password"
                        style={{ margin: 8 }}
                        placeholder="Password"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("password")}

                      />

                      {touched.password && errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                      <TextField
                        name="ConfirmPassword"
                        id="confirmPassword"
                        label="Input Password"
                        style={{ margin: 8 }}
                        placeholder="Password"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("confirmPassword")}

                      />
                      <TextField
                        name="PhoneNumber"
                        id="PhoneNumber"
                        label="Input Phone Number"
                        style={{ margin: 8 }}
                        placeholder="Phone Number"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("PhoneNumber")}

                      />

                      {touched.PhoneNumber && errors.PhoneNumber && <div style={{ color: 'red' }}>{errors.PhoneNumber}</div>}
                      <TextField
                        name="Country"
                        id="Country"
                        label="Input Country"
                        style={{ margin: 8 }}
                        placeholder="Country"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("Country")}

                      />
                      <TextField
                        name="Fax"
                        id="Fax"
                        label="Input Fax"
                        style={{ margin: 8 }}
                        placeholder="Fax"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("Fax")}

                      />

                      {touched.Fax && errors.Fax && <div style={{ color: 'red' }}>{errors.Fax}</div>}
                      <TextField
                        name="State"
                        id="State"
                        label="Input State"
                        style={{ margin: 8 }}
                        placeholder="State"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("State")}

                      />

                      {touched.State && errors.State && <div style={{ color: 'red' }}>{errors.State}</div>}
                      <TextField
                        name="premiumshipping"
                        id="premiumshipping"
                        label="Input Premium Shipping Amount"
                        style={{ margin: 8 }}
                        placeholder="Premium Shipping Amount"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("Premium Shipping")}

                      />

                      {touched.State && errors.State && <div style={{ color: 'red' }}>{errors.State}</div>}
                      <TextField
                        name="lat"
                        id="lat"
                        label="Input latittude"
                        style={{ margin: 8 }}
                        placeholder="latittude"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("lat")}

                      />

                      {touched.lat && errors.lat && <div style={{ color: 'red' }}>{errors.lat}</div>}

                      <TextField
                        name="long"
                        id="long"
                        label="Input longitude"
                        style={{ margin: 8 }}
                        placeholder="longitude"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("long")}

                      />

                      {touched.long && errors.long && <div style={{ color: 'red' }}>{errors.long}</div>}
                      <TextField
                        name="address"
                        id="address"
                        label="Input Address"
                        style={{ margin: 8 }}
                        placeholder="Address"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...getFieldProps("address")}

                      />

                      {touched.address && errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}

                      {touched.Country && errors.Country && <div style={{ color: 'red' }}>{errors.Country}</div>}
                      <Button disabled={loader} style={{ marginLeft: '85%', marginTop: 10, color: 'white' }} type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
      </Button>


                    </Form>

                  )
                }}
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
