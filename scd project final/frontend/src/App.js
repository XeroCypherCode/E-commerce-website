import React from 'react';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import Layout from './hocs/layout';
import Home from './containers/home';
import Login from './containers/login';
import Register from './containers/register';
import Dashboard from './containers/dashboard';
import PrivateRoute from './hocs/PrivateRoute';
import Product from './containers/product';
import Cart from './containers/cart'
import { Provider } from 'react-redux';
import Store from './store';
import Faq from './containers/faq';

const App = () => {
  return (
  <Provider store={Store}>
    <Router>
      <Layout>
      <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/:category_slug/:product_slug" element={<Product/>} />
              <Route exact path="/faq" element={<Faq/>} />
              <Route exact path="/cart" element={<Cart />} />
              <Route element={<PrivateRoute/>}>
                <Route exact path="/dashboard" element={<Dashboard />} />
               
              </Route>
      </Routes>
      </Layout>
    </Router>
  </Provider>
  )
}

export default App
