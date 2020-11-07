import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/navbar';
import Strip from '../components/strip';
import Footer from '../components/home/footer';
import { useLocation, useHistory } from 'react-router-dom';
import { urlImg } from '../utils/baseUrl';
import { repository } from '../utils/repository';
import _ from 'lodash';
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
        const categories = async () => {
            const { data, status } = await repository.CategoriesComplete().then(x => x).then(x => x);
            if (status == 200) {
                setCategories(_.take(data, 12));

            }

        }
        // if (location.state && location.state.productType) {
        //   setCategories(location.state.productType);
        // }
        window.addEventListener('scroll', handleScroll);
        categories()
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);
    return <div style={{ backgroundColor: 'white' }}>
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

        <section className="we-offer-area" ref={refmain0}>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6">
                        <div className="card-img-category">
                            <img className="card-img img-responsive" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/teaser/packaging/packaging.ashx?mh=493&mw=986&hash=748DA2F4E02CBC2AA55D657B21BAD9B8"
                                alt="Vans"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="info-title">Materials for Packaging with Lids</h3>

                        <ul className="circle-ul mt-4 font-16px">
                            <li>Adjustable dimensions</li>
                            <li>21 styles in 1 billion variations</li>
                            <li>Online Designer with 3D preview</li>
                        </ul>
<div>
<button className="btn btn-theme mt-3 font-16px mb-3">Select Packaging</button>
</div>
                    </div>
                </div>
            </div>
        </section>
        <section className="we-offer-area mt-3" style={{ backgroundColor: 'white' }}>
            <div className="container">



                <div className="col-md-12 mt-3 mb-3 sticky-inner"  >
                    <div className="nsskseucc side-sticky  font-16px" id="v-pills-tab" role="tablist" aria-orientation="vertical">
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

                <div className="row mb-5 text-center">
                    {
                        categories.map(x => <div className="mt-3 col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6 block">
                            <div className="content category-card">
                                <center>
                                    <img src={`${urlImg}system/public/dist/img/categories/${x.image}`} className="cate-img" />
                                </center>
                                <a onClick={() => {
                                    history.push("/categories/productTypes", { productType: x.product_type })
                                }} >
                                    <div className="content-overlay"></div>
                                    <div className="content-details fadeIn-bottom">
                                        <h3 className="content-title">{x.name}</h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                        )
                    }
                </div>


            </div>
        </section>


        <section class="detail-boxes font-16px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h2 class="cat-title"> Product Information for our Packaging</h2><br></br>
                        <h5 className=" font-16px">Packaging in Overview</h5>
                    </div>
                </div>
                <div class="row mt-4 mb-3">
                    <div class="col-md-6 text-center">
                        <img src="https://www.saxoprint.co.uk/-/media/saxoprint/products/category/packaging/product-packaging-group-image.ashx?mh=156&mw=280&hash=E63BE6D24B01D908CD03528467B3A820" /> <br></br>
                        <p>Packaging</p>
                    </div>
                    <div class="col-md-6 text-center">
                        <img src="https://www.saxoprint.co.uk/-/media/saxoprint/products/category/packaging/mailer-box-with-strip-and-tear-thread.ashx?mh=156&mw=280&hash=F85AD7DFFC35257B36D7D66D70E15A5F" /> <br></br>
                        <p>Mailer Boxes</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card bg-gray-cards">
                            <div class="card-body">
                                <p>Standard Sizes:</p>
                                <ul>
                                    <li>Size S</li>
                                    <li>Size M</li>
                                    <li>Size L</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card bg-gray-cards">
                            <div class="card-body">
                                <p>Standard Sizes:</p>
                                <ul>
                                    <li>Size S</li>
                                    <li>Size M</li>
                                    <li>Size L</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>adjustable dimentions</p>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>adjustable dimentions</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card bg-gray-cards">
                            <div class="card-body">
                                <p>from 1 to 10,000 units</p>
                                <p>food-safe packaging available from 100 units</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card bg-gray-cards min-130">
                            <div class="card-body">
                                <p>from 100 to 10,000 units</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>full print coverage on the exterior (4/0 coloured)</p>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>full print coverage on the exterior (4/0 coloured)</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card bg-gray-cards">
                            <div class="card-body">
                                <p>350gsm </p>
                                <p>GC1 chromo board white</p>
                                <p>350gsm </p>
                                <p>GZ1 chromium sulphate cardboard </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card bg-gray-cards min-200">
                            <div class="card-body">
                                <p>230gsm </p>
                                <p>GD laminated B-flute </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>die cut, glued</p>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>die cut, strip and tear thread</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card bg-gray-cards">
                            <div class="card-body">
                                <p>dispersion varnish </p>
                                <p>spot 3D UV coating</p>
                                <p>metallic foil blocking (gold | silver with 3D effect) </p>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card bg-gray-cards min-170">
                            <div class="card-body">
                                <p>dispersion varnish </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 gray-card-col-left">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>die cut, glued</p>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 gray-card-col-right">
                        <div class="card shadow-none">
                            <div class="card-body">
                                <p>die cut, strip and tear thread</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-8 offset-md-2 gray-card-col-left">
                        <button type="button" class="btn btn-default1zxc btn-circle-pack"><i class="fa fa-exclamation"></i>
                        </button>
                        <div class="card bg-gray-cards">
                            <div class="card-body text-center">
                                <p>
                                    In the configuration page, you can order food-safe versions of your selected packaging. Food-safe packaging is printed with special printing inks suitable for food contact materials. Please note that the materials do not have a grease or moisture barrier and are, therefore, not suitable for direct contact with moist or oily foods.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <section class="detail-boxes" ref={refmain1}>
            <div class="container"><hr></hr>

                <div class="row mt-5">
                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/category/packaging/product-packaging-group-image.ashx?mh=385&mw=692&hash=D414F518F005011355F4029244F40299" />
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12">
                                <h2 class="cat-title">Used for:</h2>
                            </div>
                        </div>

                        <ul class="circle-ul font-16px">
                            <li>Protecting and transporting your products</li>
                            <li>Product presentations</li>
                            <li>Advertising products</li>
                            <li>Effective communication</li>
                            <li>Presents and Giveaways</li>
                            <li>Influencing and inspiring the final purchasing decision</li>
                        </ul>

                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-12 text-center">
                        <h2 class="cat-title">Materials for Packaging</h2><bt></bt>
                    </div>
                </div>
            </div>
        </section>


        <section class="detail-boxes">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/details/material/packaging/chromo-board-white.ashx?mh=422&mw=760&hash=F6E7F70E59C5E21280B70C735F19949F" />
                    </div>
                    <div class="col-md-6 myTextCenter">

                        <h2 class="cat-title"> 350gsm GC1 chromo board white</h2>

                        <p class="mt-2 font-16px">This classic packaging material has a white silk matt finish on the outside, guarantees a colour-accurate print and is strong and flexible.</p>

                    </div>
                </div>
            </div>
        </section>

        <section class="detail-boxes">
            <div class="container">
                <hr></hr>
                <div class="row mt-5">
                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/teaser/promotional-material/posters/posters.ashx?mh=422&mw=760&hash=3926AD33ECC753A97246BF80075C0932" />
                    </div>
                    <div class="col-md-6 myTextCenter">
                        <h2 class="cat-title"> 350gsm GZ1 chromium sulphate cardboard pure white</h2>
                        <p class="mt-2 font-16px">This pure white paperboard is very strong and therefore ideal for high-quality, premium packaging.</p>
                    </div>

                </div>
            </div>
        </section>

        <section class="detail-boxes">
            <div class="container"><hr></hr>
                <div class="row mt-5">
                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/teaser/business-stationery/business-cards/business-cards.ashx?mh=422&mw=760&hash=F7FEF88C7AFBF6CAA0775A60E107C4DF" />
                    </div>
                    <div class="col-md-6 myTextCenter">

                        <h2 class="cat-title"> 230gsm GD laminated B-flute</h2>

                        <p class="mt-2 font-16px">We make our mailer and shipping boxes from 230gsm GD laminated B-flute. This cardboard is coated on one side, delivers an excellent print quality, has a bright white colour and is strong and flexible.</p>
                    </div>
                </div>

                <div class="row mt-4" ref={refmain2}>
                    <div class="col-md-12 text-center">
                        <h2 class="cat-title">Finishing Options for Packaging</h2><br></br>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-boxes">
            <div class="container">
                <hr></hr>
                <div class="row mt-5">
                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/details/finishing/dispersion-varnish.ashx?mh=422&mw=760&hash=649D0B54BE2F9AD5DA0B335DF1D20955" />
                    </div>
                    <div class="col-md-6 myTextCenter">

                        <h2 class="cat-title">Dispersion Varnish</h2>

                        <p class="mt-2 font-16px">For print runs of 100 units and above, we provide your packaging with a dispersion varnish. This protects the surface and ensures a high-quality print. Please note: the surface will no longer be writable or stampable due to the dispersion varnish.</p>
                    </div>

                </div>
            </div>
        </section>

        <section class="detail-boxes">
            <div class="container">
                <hr></hr>
                <div class="row mt-5">
                    <div class="col-md-6 myTextCenter">

                        <h2 class="cat-title">Spot 3D UV Coating</h2>

                        <p class="mt-2 font-16px">Enhance selected details of your packaging design with spot 3D UV coating. The glossy and slightly raised appearance of spot UV coating gives the packaging a sense of elegance and feels pleasant to the touch. This finishing option is available for GC1 chromo board white and GZ1 chromium sulphate cardboard pure white.</p>
                    </div>

                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/details/finishing/dispersion-varnish.ashx?mh=422&mw=760&hash=649D0B54BE2F9AD5DA0B335DF1D20955" />
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-boxes">
            <div class="container">
                <hr></hr>
                <div class="row mt-5">
                    <div class="col-md-6 myTextCenter">

                        <h2 class="cat-title">Metallic Foil Blocking</h2>

                        <p class="mt-2 font-16px">With metallic foil blocking - available in gold or silver on GC1 chromo board white or GZ1 chromium sulphate cardboard pure white - a metallic foil is applied to certain details of the printed surface. The shiny, slightly raised appearance gives the packaging a luxurious touch.</p>
                    </div>

                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/details/finishing/metallic-foil-blocking-in-silver.ashx?mh=422&mw=760&hash=CDF4F9CC98207A1F65621F217E783CD2" />
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-boxes">
            <div class="container">
                <div class="card bg-gray-cards">
                    <div class="row mt-5">
                        <div class="col-md-6">
                            <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/special-box/samples/packaging-sample-set.ashx?mh=470&mw=845&hash=029AC2BB90D9E79626F022E9A2F400C8" />
                        </div>
                        <div class="col-md-6 myTextCenter">

                            <h2 class="cat-title">Packaging Sample Set</h2>

                            <p class="mt-2 font-16px">Whether you choose the neutral or SAXOPRINT design, the packaging sample set contains all material and finishing samples, giving you a good overview of the stability and printing quality of our packaging.</p>
                            <p className=" font-16px">If you order a sample set in the SAXOPRINT design, we will send you a voucher to the value of £11.00 (net plus VAT) for your next order.</p>
                        </div>


                    </div>
                </div>
            </div>
        </section>


        <section class="detail-boxes">
            <div class="container">
                <hr></hr>
                <div class="row mt-5">
                    <div class="col-md-6 font-16px myTextCenter">

                        <h2 class="cat-title">Try it now for £19.90: No Strings attached*</h2>

                        <p class="mt-2">No matter what you're looking for, SAXOPRINT has the right packaging for your product. And the best thing is: you can order test packaging in your own design for only £19.90.</p>
                        <p class="mt-2">
                            This means you can be certain that the measurements are correct and your product is displayed at its best. Let yourself be convinced by the level of print and material quality. Once you have made your order, you will receive a voucher code worth £19.90 for your next packaging order.
                         </p>
                        <p class="mt-2">
                            Please note that we use a different printing process for packaging with a print run of one.
                         </p>
                        <p class="mt-2">
                            *Print runs of 1 unit are available for all packaging types except mailer boxes, food-safe packaging and packaging with finishing.
                         </p>
                    </div>

                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/details/finishing/metallic-foil-blocking-in-silver.ashx?mh=422&mw=760&hash=CDF4F9CC98207A1F65621F217E783CD2" />
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-boxes">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h5>Test order:</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <img src={require('../images/pack/test-order.PNG')} width="100%" />
                    </div>
                </div>

            </div>
        </section>

        <section class="detail-boxes">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-md-6">
                        <img class="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/details/content/online-designer/online-designer.ashx?mh=422&mw=760&hash=8BC5450768C785492ADD8C29ADF8457F" />
                    </div>
                    <div class="col-md-6 myTextCenter">

                        <h2 class="cat-title">Create your custom design online</h2>

                        <p class="mt-2 font-16px">With SAXOPRINT® easy box, no one needs to forego high-quality packaging design. Our Online Designer gives you all the tools you need to effortlessly design your own packaging that matches your corporate design and attracts public attention.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-boxes" ref={refmain3}>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h5>Design Packaging Online:</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <img src={require('../images/pack/packaging-design.PNG')} width="100%" />
                    </div>
                </div>

            </div>
        </section>


        <section class="detail-boxes">
            <div class="container">
                <div class="row mt-4">
                    <div class="col-md-12 text-center">
                        <h2 class="cat-title">Increase Sales Revenue With Custom-Made Product Packaging</h2><br></br>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 offset-md-2 font-16px">
                        <p>Packaging is much more than just protective covering for shipments; it functions as space-saving storage and as an efficient transport solution, as well as having a role in increasing sales. Companies use packaging as a targeted advertising medium to communicate their publicity messages and the benefits of their product with the aim of influencing customer decisions in the retail sector. As such, packaging design, size and shape have a direct influence on product sales and revenue.</p>
                        <h6>Why do products need product packaging?</h6>
                        <p>Attractive product packaging, adapted to the target group, creates a link between products, brands, and potential buyers. It catches people’s attention and stimulates demand, provides information about the product and makes consumers want to buy it. Custom-made product packaging is therefore particularly suitable in the following cases:</p>

                        <div class="row">
                            <div class="col-md-6">
                                <ul class="circle-ul font-16px">
                                    <li>A range of high-quality and tear-resistant materials to choose from, including 350gsm GC chromo board</li>
                                    <li>Easy folds which end customers will be familiar with</li>
                                    <li>Space-saving storage due to flat-pack shipping</li>
                                    <li>Shopping Configurator with 2D + 3D live preview video.</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="circle-ul font-16px">
                                    <li>Standard measurements or bespoke sizes available</li>
                                    <li>Available in quantities of 1 and above, with money-saving special offers for larger orders</li>
                                    <li>Suitable for resale</li>
                                </ul>
                            </div>
                        </div>

                        <h6>Boxking® easy box - the new generation of packaging printing</h6>
                        <p>If a uniform brand identity is important for your company, implement your corporate design on the packaging; your unique company colours and logo will make it easy for consumers to identify your brand quickly. Nowadays, customers are often confronted with shop shelves crammed full of different products – and find it hard to choose between them. A packaging design that stands out and makes a positive first impression can be the deciding factor in the buying process. Creative and high-quality product packaging increases the value of a product, too, because buyers consider the item inside to be of higher quality accordingly.</p>

                        <h6>Advantages of the Boxking® easy box</h6>
                        <p>The fact that our boxes can be measured and configured to the millimetre reduces the necessity for packaging materials, which is better for the environment. What is more, the SAXOPRINT® easy box is not made of plastic packaging, and is almost 100% recyclable. Full-surface four-colour printing leaves a lot of scope for varied design and gives the packaging the personality it needs. Further advantages are:</p>


                        <div class="row">
                            <div class="col-md-6">
                                <ul class="circle-ul">
                                    <li>A range of high-quality and tear-resistant materials to choose from, including 350gsm GC chromo board</li>
                                    <li>Easy folds which end customers will be familiar with</li>
                                    <li>Space-saving storage due to flat-pack shipping</li>
                                    <li>Shopping Configurator with 2D + 3D live preview video.</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="circle-ul">
                                    <li>Standard measurements or bespoke sizes available</li>
                                    <li>Available in quantities of 1 and above, with money-saving special offers for larger orders</li>
                                    <li>Suitable for resale</li>
                                </ul>
                            </div>
                        </div>

                        <h6>A billion variants to choose from</h6>
                        <p>Since the shape and size of our Boxking® easy box can be freely configured to meet your requirements, you have the choice of a billion variants. We offer 21 basic shapes in 7 different categories, all of which you can configure as you wish to your own format. As well as gift wrapping, collapsible boxes with Euro hole suspension, and shipping boxes, we also offer special shapes like triangular or loop packaging.</p>
                        <p>A Boxking pro tip: Take a look at our product sample set to get an impression of the quality of our printing, the material, and its stability. This will also enable you to recognise all forms of basic packaging and the types of fold they contain so you can decide on the right type of packaging for you.</p>
                    </div>
                </div>
            </div>
        </section>

        <Footer />


    </div>





}