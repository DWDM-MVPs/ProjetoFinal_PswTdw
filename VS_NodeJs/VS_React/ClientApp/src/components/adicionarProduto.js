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

		PRODUTOS_NEW_PRODUTO(this.state.Produto)
		.then(result=>{
			console.log(result.status)
		})
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