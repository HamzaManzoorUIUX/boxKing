import React, { useState, useEffect, useRef } from "react";
import Navbar from '../components/navbar';
import Strip from '../components/strip';
import Footer from '../components/home/footer';
import { urlImg } from '../utils/baseUrl';
import { StickyContainer, Sticky } from 'react-sticky';
import { useLocation, useHistory } from 'react-router-dom';
import _ from 'lodash';

let selectedProduct = 0;
export default () => {
  const location = useLocation();
  const history = useHistory();

  const [TabIndex, setTabIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const prdRef = useRef(null);
  const refmain0 = useRef(null);
  const refmain1 = useRef(null);
  const refmain2 = useRef(null);
  const refmain3 = useRef(null);
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null); const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };


  useEffect(() => {

    if (location.state && location.state.productType) {
      setCategories(location.state.productType);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);



  const getTabData = (TabIndex1) => {

    if (TabIndex1 == 0) {

      return <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
        <div className="row mb-5">
          <div className="col-md-12">
            <h3 className="info-title">Product Information for Packaging with Lids</h3>
          </div>
        </div>

        {
          (categories.ptypeinformation ? categories.ptypeinformation.map((x, i) => {

            if (i % 2 == 0) {
              return <>
                <div className="row">
                  <div className="col-md-12 ">
                    <h1 className="info-title" >{x.title}</h1>
                    <p className="sub-title">
                      <div className="asjkfakslfj2324p" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                      </div>
                    </p>
                  </div>
                </div>
                <div className="row mt-2 pt-5">
                  <div className="col-md-6">
                    <table className="table table-borderless table-sm">
                      <tr>
                        <td className="asjkfakslfj2324p">Inner Dimensions Width (W)</td>
                        <td className="asjkfakslfj2324p" >{x.width}</td>
                      </tr>
                      <tr>
                        <td className="asjkfakslfj2324p"> Inner Dimensions Depth (D)</td>
                        <td className="asjkfakslfj2324p"> {x.depth}</td>
                      </tr>
                      <tr>
                        <td className="asjkfakslfj2324p">Inner Dimensions Height (H)</td>
                        <td className="asjkfakslfj2324p">{x.height}</td>
                      </tr>
                    </table>
                  </div>

                  <div className="col-md-6">
                    <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypeinformation/${x.image}`} />
                  </div>
                </div>
                <hr />
              </>
            }
            else {
              return <>
                <div className="row">
                  <div className="col-md-12 ">
                    <h1 className="info-title" >{x.title}</h1>
                    <p className="sub-title">
                      <div className="asjkfakslfj2324p" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                      </div>
                    </p>
                  </div>
                </div>
                <div className="row mb-4">

                  <div className="col-md-6">
                    <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypeinformation/${x.image}`} />
                  </div>
                  <div className="col-md-6">
                    <table className="table table-borderless table-sm">
                      <tr>
                        <td className="asjkfakslfj2324p">Inner Dimensions Width (W)</td>
                        <td className="asjkfakslfj2324p" >{x.width}</td>
                      </tr>
                      <tr>
                        <td className="asjkfakslfj2324p"> Inner Dimensions Depth (D)</td>
                        <td className="asjkfakslfj2324p"> {x.depth}</td>
                      </tr>
                      <tr>
                        <td className="asjkfakslfj2324p">Inner Dimensions Height (H)</td>
                        <td className="asjkfakslfj2324p">{x.height}</td>
                      </tr>
                    </table>
                  </div>

                </div>
                <hr />
              </>
            }

          }
          )
            : <></>)
        }
      </div>

    }
    else if (TabIndex1 == 1) {

      return <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" >
        <div className="row mb-5">
          <div className="col-md-12">
            <h3 className="info-title">Materials for Packaging with Lids</h3>
          </div>
        </div>
        {
          (categories.ptypematerial ? categories.ptypematerial.map((x, i) => {
            if (i % 2 == 0) {
              return <> <div className="row mb-5 mt-2 pt-5">
                <div className="col-md-6">
                  <h1 className="mb-4" >{x.title}</h1>
                  <p className="sub-title">
                    <div className="csstdusdtuae" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                    </div>
                  </p>            </div>
                <div className="col-md-6">
                  <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypematerial/${x.image}`} />

                </div>
              </div>
                <hr />
              </>
            }
            else {
              return <> <div className="row mb-5 mt-2 pt-5">
                <div className="col-md-6">
                  <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypematerial/${x.image}`} />

                </div>
                <div className="col-md-6">
                  <h1 className="mb-4">{x.title}</h1>
                  <p className="sub-title">
                    <div className="csstdusdtuae" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                    </div>
                  </p>            </div>

              </div>
                <hr />
              </>
            }

          })
            : <></>)
        }



      </div>

    }
    else if (TabIndex1 == 2) {

      return <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" >
        <div className="row mb-5">
          <div className="col-md-12">
            <h3 className="info-title">Materials for Packaging with Lids</h3>
          </div>
        </div>
        {
          (categories.ptypefinishing ? categories.ptypefinishing.map((x, i) => {
            if (i % 2 == 0) {
              return <>  <div className="row mb-5 mt-2 pt-5">
                <div className="col-md-6">
                  <h1 >{x.title}</h1>
                  <p className="sub-title">
                    <div className="csstdusdtuae" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                    </div>
                  </p>            </div>
                <div className="col-md-6">
                  <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypefinishing/${x.image}`} />

                </div>
              </div>          <hr />
              </>
            }
            else {
              return <>
                <div className="row mb-5 mt-2 pt-5">
                  <div className="col-md-6">
                    <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypefinishing/${x.image}`} />

                  </div>
                  <div className="col-md-6">
                    <h1 >{x.title}</h1>
                    <p className="sub-title">
                      <div className="csstdusdtuae" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                      </div>
                    </p>            </div>

                </div>          <hr />

              </>
            }
          })
            : <></>)
        }
      </div>

    }
    else if (TabIndex1 == 3) {
      return <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" >
        <div className="row mb-5">
          <div className="col-md-12">
            <h3 className="info-title">Test Packaging - Try it now for £19.90
</h3>
          </div>
        </div>
        {
          (categories.ptypetestrun ? categories.ptypetestrun.map((x, i) => {
            if (i % 2 == 0) {
              return <>
                <div className="row mb-5 mt-2 pt-5">
                  <div className="col-md-6">
                    <h1 >{x.title}</h1>
                    <p className="sub-title">
                      <div className="csstdusdtuae" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                      </div>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypetestrun/${x.image}`} />

                  </div>
                </div>          <hr />

              </>
            }
            else {
              return <>

                <div className="row mb-5 mt-2 pt-5">
                  <div className="col-md-6">
                    <img className="product-info-img" src={`${urlImg}system/public/dist/img/ptypetestrun/${x.image}`} />

                  </div>
                  <div className="col-md-6">
                    <h1 >{x.title}</h1>
                    <p className="sub-title">
                      <div className="csstdusdtuae" dangerouslySetInnerHTML={{ __html: x.shortdescription }} >
                      </div>
                    </p>
                  </div>

                </div>          <hr />
              </>
            }
          })
            : <></>)
        }     </div>

    }

  }
  return (
    <>
     <div style={{backgroundColor:'white'}}>
     <Strip />
      <Navbar />
      <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
            <div className="col-md-12 sticky-inner"  >
              <div className="nsskseucc side-sticky" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className={TabIndex == 0 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-home-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(0)
                  refmain0.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-home" aria-selected="true"> Product Information</a>
                <a className={TabIndex == 1 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-profile-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(1)
                  refmain1.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-profile" aria-selected="false">Materials</a>
                <a className={TabIndex == 2 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-messages-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(2)
                  refmain2.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-messages" aria-selected="false">Finishing Options</a>
                <a className={TabIndex == 3 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-settings-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(3)
                  refmain3.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-settings" aria-selected="false">Test Run</a>
              </div>

            </div>

       </div>
      <section className="we-offer-area" style={{ backgroundColor: 'white' }}>
        <div className="container">

          <div className="row mt-5">
            <div className="col-md-6">
              <div className="card-img-category">
                <img className="card-img img-responsive" src={`${urlImg}system/public/dist/img/prdtype/${categories.image}`}
                  alt="Vans"
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* <h3 className="info-title">{categories.name}</h3> */}
              <div className="csstdusdtuae" dangerouslySetInnerHTML={{ __html: categories.description }}>

              </div>

              <button className="btn btn-theme mt-3" onClick={() => {
                prdRef.current.scrollIntoView({ behavior: 'smooth' })
              }}>Select Packaging</button>
            </div>
          </div>

          <div className="row mb-3 mt-5 cssd2tudas">
            <div className="col-md-12">
              <h5 className="sdasddw22" ref={prdRef}>Available Products</h5>
            </div>
          </div>
          <div className="row mb-5 text-center">

            {
              (categories.all_products ? categories.all_products.map(x => {
                return <div className="col-md-3 mb-3">
                  <a onClick={() => history.push("/productdetial", { product: x })}>
                    <div className="card product-card">
                      <div className="product-img">
                        <img className="card-img img-responsive" src={`${urlImg}system/public/dist/img/upload/${x.image}`} alt="Vans" />
                      </div>
                      <div className="card-img-overlay d-flex justify-content-end">
                        <a className="card-link">£{x.unitCost}</a>
                      </div>
                      <div className="card-body">
                        <h5 className="product-title mt-2 mb-2">{x.title}</h5>
                        <span className="product-description">{x.shortdescription}</span>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <button className="btn change-btn" onClick={() => {

                          }}>View</button>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

              })
                : "")
            }
          </div>


          <div className="col-md-12 mt-3 mb-3 sticky-inner"  >
              <div className="nsskseucc side-sticky" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className={TabIndex == 0 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-home-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(0)
                  refmain0.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-home" aria-selected="true"> Product Information</a>
                <a className={TabIndex == 1 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-profile-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(1)
                  refmain1.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-profile" aria-selected="false">Materials</a>
                <a className={TabIndex == 2 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-messages-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(2)
                  refmain2.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-messages" aria-selected="false">Finishing Options</a>
                <a className={TabIndex == 3 ? "nav-link activelinkwwe213" : "nav-link"} id="v-pills-settings-tab" data-toggle="pill" onClick={() => {
                  setTabIndex(3)
                  refmain3.current.scrollIntoView({ behavior: 'smooth' })
                }} role="tab" aria-controls="v-pills-settings" aria-selected="false">Test Run</a>
              </div>

            </div>


          <div className="row mt-5">
            <div className="col-md-12">
              <div className="tab-content" id="v-pills-tabContent">
                <div ref={refmain0}>
                  {
                    getTabData(0)
                  }
                </div>
                <div ref={refmain1}>
                  {
                    getTabData(1)
                  }

                </div>
                <div ref={refmain2}>
                  {
                    getTabData(2)
                  }

                </div>
                <div ref={refmain3}>
                  {
                    getTabData(3)
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

     </div>
    </>
  );
}

