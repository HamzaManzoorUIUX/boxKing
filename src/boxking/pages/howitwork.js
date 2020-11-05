import React from 'react';
import Navbar from '../components/navbar';
import Strip from '../components/strip';
import { Accordion, Button, Card } from 'react-bootstrap'

import Footer from '../components/home/footer';

export default () => {
  return <>
    <div className="mainbacksfw3">
      <Strip />
      <Navbar />
      <section className="how-main-sec mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <h2 className="cat-title line-h-h">
                We're not only a service providers.
                                  </h2>
              <p className="mt-2 f-14-how">We provide best solutions for a Coaching Services. If you need any help in cleaning or maintenance contact us today to get your body clean. We provide best solutions for a Coaching Services. We provide best solutions for a Coaching Services. If you need any help in cleaning or maintenance contact us today to get your body clean.</p>
              <button className="btn btn-theme-how mt-3">Start Today</button>
            </div>

            <div className="col-md-6 col-12 text-center">
              <img className="detail-img" src="https://finaptisindia.com/wp-content/uploads/2020/03/select.png" />
            </div>
          </div>
        </div>
      </section>

      <section className="we-offer-area mt-5">
        <div className="container"><br /><br />
          <div className="row mb-5 mt-4">
            <div className="col-md-4 my-3 col-12">
              <div className="card how-card">
                <div className="card-body">
                  <h4 className="mb-3 mbsdf3h234o">Book Online</h4>
                  <span className="product-description">
                    Business Consultancy International is your gateway to a successful future in business. Start today to learn more.
                              </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 my-3 col-12">
              <div className="card how-card">
                <div className="card-body">
                  <h4 className="mb-3 mbsdf3h234o">Get Confirmation</h4>
                  <span className="product-description">
                    Business Consultancy International is your gateway to a successful future in business. Start today to learn more.
                              </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 my-3 col-12">
              <div className="card how-card">
                <div className="card-body">
                  <h4 className="mb-3 mbsdf3h234o">Let’s Enjoy</h4>
                  <span className="product-description">
                    Business Consultancy International is your gateway to a successful future in business. Start today to learn more.
                              </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 my-3 col-12">
              <div className="card how-card">
                <div className="card-body">
                  <h4 className="mb-3 mbsdf3h234o">Book Online</h4>
                  <span className="product-description">
                    Business Consultancy International is your gateway to a successful future in business. Start today to learn more.
                              </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 my-3 col-12">
              <div className="card how-card">
                <div className="card-body">
                  <h4 className="mb-3 mbsdf3h234o">Get Confirmation</h4>
                  <span className="product-description">
                    Business Consultancy International is your gateway to a successful future in business. Start today to learn more.
                              </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 my-3 col-12">
              <div className="card how-card">
                <div className="card-body">
                  <h4 className="mb-3 mbsdf3h234o">Let’s Enjoy</h4>
                  <span className="product-description">
                    Business Consultancy International is your gateway to a successful future in business. Start today to learn more.
                              </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="how-main-sec bg-h-w">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <h2 className="cat-title"> The power of Boxking</h2>
              <p className="mt-2 f-14-how">We provide best solutions for a Coaching Services. If you need any help in cleaning or maintenance contact us today to get your body clean. We provide best solutions for a Coaching Services. We provide best solutions for a Coaching Services. If you need any help in cleaning or maintenance contact us today to get your body clean.</p>
              <button className="btn btn-theme-how">Start Today</button>
            </div>

            <div className="col-md-6 col-12 text-center">
              <img className="detail-img" src="https://www.drozd.at/karka/images/content/services/1.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className="how-main-sec h-cs-padd">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 text-center">
              <img className="detail-img" src="https://www.drozd.at/karka/images/content/services/2.jpg" />
            </div>

            <div className="col-md-6 col-12">
              <h2 className="cat-title"> The power of Boxking</h2>
              <p className="mt-2 f-14-how">We provide best solutions for a Coaching Services. If you need any help in cleaning or maintenance contact us today to get your body clean. We provide best solutions for a Coaching Services. We provide best solutions for a Coaching Services. If you need any help in cleaning or maintenance contact us today to get your body clean.</p>
              <button className="btn btn-theme-how">Start Today</button>
            </div>

          </div>
        </div>
      </section>

      <section className="how-main-sec bg-h-w">
        <div className="container">
          <div className="row mb-5 mt-0">
            <div className="col-md-6 offset-md-3 text-center">
              <h2 className="cat-title mb-3">Our FAQ's</h2>
              <p className="mt-3 f-14">We can help you create positive.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2">
              <Accordion defaultActiveKey="0">
                <Card className="mb-3 bg-transparent">
                  <Accordion.Toggle as={Card.Header} className="faqsCards" eventKey="0">
                    Why is the moon sometimes out during the day?
    </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.
      </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="mb-3 bg-transparent">
                  <Accordion.Toggle as={Card.Header} className="faqsCards" eventKey="1">
                    Why is the sky blue?
    </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="mb-3 bg-transparent">
                  <Accordion.Toggle as={Card.Header} className="faqsCards" eventKey="2">
                    Will we ever discover aliens?
    </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="mb-3 bg-transparent">
                  <Accordion.Toggle as={Card.Header} className="faqsCards" eventKey="3">
                    How much does the Earth weigh?
    </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="mb-3 bg-transparent">
                  <Accordion.Toggle as={Card.Header} className="faqsCards" eventKey="4">
                    How do airplanes stay up?
    </Accordion.Toggle>
                  <Accordion.Collapse eventKey="4">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>

              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </>
}
