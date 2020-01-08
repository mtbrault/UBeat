import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import MainLayout from './MainLayout';


const history = createBrowserHistory();

const MainRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/" component={MainLayout} />
    </Switch>
  </Router>
);

export default MainRouter;
