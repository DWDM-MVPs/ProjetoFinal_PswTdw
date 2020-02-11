import React, { Component } from "react";
import { Route,Redirect } from "react-router";
import { Layout } from "./components/Layout";
import Login from "./components/Login";
import Carrinho from "./components/Carrinho";
import Produtos from "./components/Produtos";
import AdicionarProduto from "./components/adicionarProduto";
import EditarProduto from "./components/editarProduto";

export default class App extends Component {
	displayName = App.name

	render() {
		return (
			<Layout>
				<Redirect from="/" to="/login" />
				<Route exact path="/produtos" component={Produtos} />
				<Route path="/carrinho" component={Carrinho} />
				<Route path="/login" component={Login} />
				<Route path="/adicionarProduto" component={AdicionarProduto} />
				<Route path="/editarProduto" component={EditarProduto} />
			</Layout>
		);
	}
}