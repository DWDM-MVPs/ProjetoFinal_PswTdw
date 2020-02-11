import React, { Component } from 'react';
import { PRODUTOS_NEW_PRODUTO } from '../API'
import '../css/AddEdProds.css';

class AdicionarProduto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Produto: {
				name: "",
				stock: 0,
				price: 0,
				allergens: true,
				isActive: true,
			},
		}
	}

	handleChange = (e) => {
		var input = this.state.Produto;
		input[e.target.name] = e.target.value;

		this.setState({
			Produto : input
		})
	}

	newProduto = (e) =>{
		e.preventDefault();

		fetch("http://83.132.83.200:1337/api/produtos/add-produto", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				{
					token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW4iLCJpYXQiOjE1ODE0NjQ1MzUsImV4cCI6MTU4MTQ2ODEzNX0.qMOOLD2DJFAtwI1swztTCtthv-De7i_jDGJMqS96nck",
					name: this.state.name,
					stock: this.state.stock,
					price: this.state.price,
					allergens: this.state.allergens,
					isActive: this.state.isActive,
				}
			),
		}).then((response) => {return response});
	}



	render() {
		return (
			<div id="forms">
				<form action="/action_page.php" onSubmit={(e) => this.newProduto(e)}>
					Name: 
					<input type="text" name="name" onChange={this.handleChange} />
					<br />
					<br />
					Stock:
					<input type="number" name="stock" step="1" onChange={this.handleChange} />
					<br />
					<br />
					Price: 
					<input type="number" name="price" step="0.05" onChange={this.handleChange} />
					<br />
					<br />
					Allergens:
					<select name="allergens" onChange={this.handleChange}>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
					<br />
					<br />
					Is Active?:
					<select name="isActive" onChange={this.handleChange}>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
					<br/><br/><br/>
					<button id="AddPro" type="submit">Adicionar Produto</button>
				</form>
			</div>
		);
	}
}
export default AdicionarProduto;

/*
	adicionarProdutO = (e) =>{
		e.preventDefault();
		const res = fetch('83.132.83.200:1337/api/produtos/add-produto', {
		  method: 'post',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ name: "", stock: ' ', price: ' ', allergens: ' ', isActive: ' ' }),
	
		})
		  .then((response) => response.json())
		  .then((responseJson) => {
			return responseJson.movies;
		  })
		  .catch((error) => {
			console.error(error);
		  });
		console.log(res);
	  }
*/ 