
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Notice, Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { repository } from '../../../boxking/utils/repository';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6


const DisplayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),

  productTypeId: Yup.string()
    .required('Required'),

  shortdescription: Yup.string()
    .required('Required'),

  unitCost: Yup.string()
    .required('Required'),
    makeFeature: Yup.string()
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
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  inputx: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}));



export default function TextFields() {

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  let cstErrors;
  let cstValues;
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productType, setproductType] = useState([]);
  const [image, setImage] = useState('');
  const [model, setModel] = useState('');
  const [uvImage, setuvImage] = useState('');

  const [message, setMessage] = useState("Opps Something wen't wrong");

  const classes = useStyles();


  const encodeImageFileAsURL = (element) => {
    var file = element.target.files[0];
    var reader = new FileReader();
    var result;
    reader.onloadend = function () {
      result = reader.result;

    }



    const dd = reader.readAsDataURL(file);
    console.log(3, result);

    return result;
  }

  const handleCategoryChanged = (id) => {
    const filterdData = categories.filter(x => x.id == id);
    console.log(filterdData[0].product_type)

    setproductType(filterdData[0].product_type);
  }

  useEffect(() => {
    getCat();
  }, [])

  const getCat = async () => {
    const { status, data } = await repository.getCategoriesWithProductTypes().then(x => x).then(x => x);
    if (status != 200) {
      setCategories([])
    }
    else {
      setCategories(data);
    }
  }
  const postCat = async (datapost) => {
    setloader(true);
    const { data, status } = await repository.postproduct(datapost).then(x => x).then(x => x)
    try {
      if (status != 200) {
        setOpen(true)
        setMessage("Opps Something wen't wrong")
      }
      else {
        setOpen(true)
        setMessage("Success! Product added sucessfully")
      }

      setTimeout(() => {
        setOpen(false)
      }, 3000);
      setloader(false);

      if (status == 200) {
        return true;

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
            <CardHeader title="Product" />
            <CardBody>
              <Formik
                initialValues={{
                  title: '',
                  image: '',
                  uvImage: '',
                  shortdescription: '',
                  longdescription: '',
                  unitCost: '',
                  minimumWidth: '',
                  minimumHeight: '',
                  minimumDepth: '',
                  hasModel: false,
                  modelPath: '',
                  productTypeId: '',
                  makeFeature: 0,
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log(values);
                  // same shape as initial values
                  /*
                  
                    */
                  const val = await postCat(values);
                  console.log(val)
                  if (val == true) {
                    setModel('');
                    setuvImage('');
                    setImage('');
                    values.image = "";
                    values.title = "";
                    values.uvImage = "";
                    values.shortdescription = "";
                    values.longdescription = "";
                    values.unitCost = "";
                    values.minimumWidth = "";
                    values.minimumHeight = "";
                    values.minimumDepth = "";
                    values.hasModel = false;
                    values.modelPath = "";
                    values.productTypeId = "";
                    values.makeFeature=0;
                  }
                  setSubmitting(false);
                }}
              >
                {({ errors, touched, getFieldProps, initialValues, setFieldValue,values }) => {
                  cstErrors = errors;
                  cstValues = initialValues;
                  return <Form>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Select Category"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      style={{ margin: 8, width: '100%' }}
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText="Please select Category"
                      margin="normal"
                      onChange={(e, x) => handleCategoryChanged(x.props.value)}
                    >
                      {categories.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>


                    <TextField
                      id="productTypeIdsz"
                      select
                      label="Select Product Type"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      style={{ margin: 8, width: '100%' }}
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText="Please select Product Type"
                      margin="normal"
                      {...getFieldProps("productTypeId")}
                    >
                      {productType.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched.productTypeId && errors.productTypeId && <div style={{ color: 'red' }}>{errors.productTypeId}</div>}

                    <TextField
                      name="title"
                      id="standard-full-width"
                      label="Input Product Title"
                      style={{ margin: 8 }}
                      placeholder="Square Box"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps("title")}

                    />
                    {touched.title && errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}

                    <TextField
                      name="Short Description"
                      id="standard-full-width"
                      label="Input Product Description"
                      style={{ margin: 8 }}
                      placeholder="...."
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps("shortdescription")}

                    />
                    {touched.shortdescription && errors.shortdescription && <div style={{ color: 'red' }}>{errors.shortdescription}</div>}



                    <ReactQuill placeholder="Description" theme="snow" value={values.longdescription} onChange={(e)=>{setFieldValue("longdescription",e)}}/>

                    {touched.longdescription && errors.longdescription && <div style={{ color: 'red' }}>{errors.longdescription}</div>}

                    <TextField
                      name="DetailDescriptionminimumWidth"
                      id="standards-full-widtminimumWidthh"
                      label="Input Minimum Width"
                      style={{ margin: 8 }}
                      placeholder="...."
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps("minimumWidth")}

                    />
                    {touched.minimumWidth && errors.minimumWidth && <div style={{ color: 'red' }}>{errors.minimumWidth}</div>}

                    <TextField
                      name="minimumHeight"
                      id="minimumHeight"
                      label="Input Minimum Height"
                      style={{ margin: 8 }}
                      placeholder="...."
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps("minimumHeight")}

                    />
                    {touched.minimumHeight && errors.minimumHeight && <div style={{ color: 'red' }}>{errors.minimumHeight}</div>}

                    <TextField
                      name="minimumDepth"
                      id="minimumDepth"
                      label="minimumDepth"
                      style={{ margin: 8 }}
                      placeholder="...."
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps("minimumDepth")}

                    />
                    {touched.minimumDepth && errors.minimumDepth && <div style={{ color: 'red' }}>{errors.minimumDepth}</div>}

                    <TextField
                      name="unitCost"
                      id="unitCost"
                      label="Input Unit Cost"
                      style={{ margin: 8 }}
                      placeholder="...."
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps("unitCost")}

                    />
                    {touched.unitCost && errors.unitCost && <div style={{ color: 'red' }}>{errors.unitCost}</div>}

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


                    <div style={{ display: 'flex' }}>
                      <TextField
                        name="img"
                        id="img"
                        label="Upload Image"
                        style={{ margin: 8, width: '73%' }}
                        placeholder="...."
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        readOnly
                        value={model}

                      />
                      <label htmlFor="upload-photo1" style={{ paddingTop: 27 }}>
                        <input
                          style={{ display: "none" }}
                          accept=".gltf"
                          id="upload-photo1"
                          name="upload-photo1"
                          type="file"
                          onChange={e => {
                            let file = e.target.files[0];
                            let reader = new FileReader();
                            reader.onloadend = function () {
                              setFieldValue("modelPath", reader.result)
                              setFieldValue("hasModel", true)
                              setModel(file.name)

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
                          <AddIcon /> Upload Model
      </Fab>
                      </label>
                    </div>

                    {touched.modelPath && errors.modelPath && <div style={{ color: 'red' }}>{errors.modelPath}</div>}
                    <div style={{ display: 'flex' }}>
                      <TextField
                        name="img"
                        id="img"
                        label="Upload Image"
                        style={{ margin: 8, width: '71%' }}
                        placeholder="...."
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        readOnly
                        value={uvImage}

                      />
                      <label htmlFor="upload-photo2" style={{ paddingTop: 27 }}>
                        <input
                        accept="image/*"
                          style={{ display: "none" }}
                          id="upload-photo2"
                          name="upload-photo2"
                          type="file"
                          onChange={e => {
                            let file = e.target.files[0];
                            console.log(file)
                            let reader = new FileReader();
                            reader.onloadend = function () {
                              setFieldValue("uvImage", reader.result)
                              setuvImage(file.name)
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
                          <AddIcon /> Upload Cutting
      </Fab>
                      </label>
                    </div>

                    {touched.uvImage && errors.uvImage && <div style={{ color: 'red' }}>{errors.uvImage}</div>}
                    <TextField
                      id="productTypeIdsz"
                      select
                      label="Make Feature"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      style={{ margin: 8, width: '100%' }}
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText="Make Product Feature"
                      margin="normal"
                      {...getFieldProps("makeFeature")}
                    >
                      
                      <MenuItem key={0} value={0}>
                         No
                        </MenuItem>
                      <MenuItem key={1} value={1}>
                          Yes
                        </MenuItem>
                    </TextField>
                    {touched.makeFeature && errors.makeFeature && <div style={{ color: 'red' }}>{errors.makeFeature}</div>}



                    <Button disabled={loader} style={{ marginLeft: '85%', marginTop: 10, color: 'white' }} type="submit" variant="contained" color="primary" className={classes.button}>
                      Submit
    </Button>


                  </Form>

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
