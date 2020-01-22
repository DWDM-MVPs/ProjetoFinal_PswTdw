import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Login from "./components/Login";
import  Carrinho  from './components/Carrinho';
import  Dashboard from './components/Dashboard';
import Produtos from './components/Produtos';



export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Produtos} />
        <Route path='/carrinho' component={Carrinho} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
      </Layout>
    );
  }
}
