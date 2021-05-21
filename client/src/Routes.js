import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';

const Routes = () => {
  return(
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
          <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/signin' exact component={Signin} />
        </Switch>
      </BrowserRouter>
  )
};

export default Routes;