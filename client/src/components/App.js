import React, { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
const LandingPage = lazy(() => import("./views/LandingPage/LandingPage.js"))
const LoginPage  = lazy(() => import("./views/LoginPage/LoginPage.js"));
const RegisterPage = lazy(() => import("./views/RegisterPage/RegisterPage.js"));
const NavBar = lazy(() => import("./views/NavBar/NavBar"));
const Footer = lazy(() => import("./views/Footer/Footer"));
const UploadProductPage = lazy(() => import("./views/UploadProductPage/uploadProductPage"));
const DetailedProductPage = lazy(() => import("./views/DetailedProductPage/DetailedProductPage"));
const CartPage = lazy(() => import("./views/CartPage/cartPage"));
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailedProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
