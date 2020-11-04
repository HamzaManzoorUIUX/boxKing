import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import ProductType from './pages/admin/productType'
import Product from './pages/admin/product'
import Products from './pages/admin/products'
import PrintingCompany from './pages/admin/printingCompany'
import ProductTypes from './pages/admin/productTypes';
import PrintingCompanies from './pages/admin/printingCompanies';
import Orders from './pages/admin/orders';
import Category from './pages/admin/category';
import Categories from './pages/admin/categories';

import Processing from './pages/admin/processing';
import Processings from './pages/admin/processings';

import Material from './pages/admin/material';
import Materials from './pages/admin/materials';

import Finishing from './pages/admin/finishing';
import Blog from './pages/admin/blog';
import Finishings from './pages/admin/finishings';
import Blogs from './pages/admin/blogs';

import FinishingEffect from './pages/admin/finishingeffect';
import FinishingEffects from './pages/admin/finishingeffects';

import EditCategory from './pages/admin/editForms/editcategory'
import EditProductType from './pages/admin/editForms/editproductType'
import EditPrintingCompany from './pages/admin/editForms/editprintingCompany'
import EditFinishing from './pages/admin/editForms/editfinishing'
import EditFinishingEffect from './pages/admin/editForms/editfinishingeffect'
import EditProcessing from './pages/admin/editForms/editprocessing';
import Editblog from './pages/admin/editForms/editblog';
import Editmaterial from './pages/admin/editForms/editmaterial';
import Editproduct from './pages/admin/editForms/editproduct';
import Ptypefinishing from './pages/admin/updatev2/create/Ptypefinishing';
import PtypeMaterials from './pages/admin/updatev2/create/ptypematerial';
import Ptypetestrun from './pages/admin/updatev2/create/ptypetestrun';
import Ptypeinformation from './pages/admin/updatev2/create/ptypeinformation';
import Ptypeinformations from './pages/admin/updatev2/get/ptypeinformations';
import UpdatePtypeinformations from './pages/admin/updatev2/update/updatePtypefinishing';
import Ptypetestruns from './pages/admin/updatev2/get/ptypetestruns';
import Gettypematerials from './pages/admin/updatev2/get/ptypematerial';
import Ptypefinishings from './pages/admin/updatev2/get/ptypefinishing';
import Updatetestrun from './pages/admin/updatev2/update/Updatetestrun';
import Updatematerial from './pages/admin/updatev2/update/Updatematerial';
import Updatedinishing from './pages/admin/updatev2/update/Updatedinishing';
import Users from './pages/admin/users'
import Payments from './pages/admin/payments'
import OrderItems from './pages/admin/ordersItem'
import OrderItem from './pages/admin/orderItem'
const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/admin" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/admin/producttype" component={ProductType} />
        <Route path="/admin/product" component={Product} />
        <Route path="/admin/products" component={Products} />
        <Route path="/admin/productTypes" component={ProductTypes} />
        <Route path="/admin/printingCompanies" component={PrintingCompanies} />
        <Route path="/admin/orders" component={Orders} />
        <Route path="/admin/category" component={Category} />
        <Route path="/admin/categories" component={Categories} />


        <Route path="/admin/printing" component={PrintingCompany} />
        <Route path="/admin/Ptypefinishing" component={Ptypefinishing} />
        <Route path="/admin/ptypeMaterials" component={PtypeMaterials} />
        <Route path="/admin/ptypeinformation" component={Ptypeinformation} />
        <Route path="/admin/Ptypetestrun" component={Ptypetestrun} />

        {//get
        }
        <Route path="/admin/Ptypeinformations" component={Ptypeinformations} />
        <Route path="/admin/edit/UpdatePtypeinformations" component={UpdatePtypeinformations} />

        <Route path="/admin/Ptypetestruns" component={Ptypetestruns} />
        <Route path="/admin/edit/Updatetestrun" component={Updatetestrun} />

        <Route path="/admin/getptypematerials" component={Gettypematerials} />
        <Route path="/admin/edit/Updatematerial" component={Updatematerial} />

        <Route path="/admin/ptypefinishings" component={Ptypefinishings} />
        <Route path="/admin/edit/Updatedinishing" component={Updatedinishing} />






        <Route path="/admin/processing" component={Processing} />
        <Route path="/admin/processings" component={Processings} />
        <Route path="/admin/material" component={Material} />
        <Route path="/admin/materials" component={Materials} />
        <Route path="/admin/finishing" component={Finishing} />
        <Route path="/admin/finishings" component={Finishings} />
        <Route path="/admin/finishingEffect" component={FinishingEffect} />
        <Route path="/admin/finishingEffects" component={FinishingEffects} />
        <Route path="/admin/edit/category" component={EditCategory} />
        <Route path="/admin/edit/productType" component={EditProductType} />
        <Route path="/admin/edit/printingCompany" component={EditPrintingCompany} />
        <Route path="/admin/edit/Finishing" component={EditFinishing} />
        <Route path="/admin/edit/finishingeffect" component={EditFinishingEffect} />
        <Route path="/admin/edit/processing" component={EditProcessing} />
        <Route path="/admin/edit/material" component={Editmaterial} />
        <Route path="/admin/edit/Product" component={Editproduct} />


        <Route path="/admin/edit/blog" component={Editblog} />
        <Route path="/admin/blogs" component={Blogs} />
        <Route path="/admin/blog" component={Blog} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/payments" component={Payments} />


        <Route path="/admin/OrderItems" component={OrderItems} />
        <Route path="/admin/OrderItem" component={OrderItem} />





        <Redirect to="error/error-v1" />

      </Switch>
    </Suspense>
  );
}
