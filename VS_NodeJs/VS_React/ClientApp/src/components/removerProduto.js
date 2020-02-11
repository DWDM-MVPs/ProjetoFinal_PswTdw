import React, { Component } from 'react';
import { PRODUTOS_DELETE_PRODUTO } from '../API'
import '../css/AddEdProds.css';

class RemoverProduto extends Component {
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

	removeProduto = (e) =>{
		e.preventDefault();
		PRODUTOS_DELETE_PRODUTO(this.state.Produto)
		.then(result=>{
			console.log(result.status)
		})
	}



	render() {
		return (
			<div id="forms">
				<form action="/action_page.php" onSubmit={(e) => this.removeProduto(e)}>
					Name: 
					<input type="text" name="name" onChange={this.handleChange} />
					<br />
					<br />
					<br/><br/><br/>
					<button id="AddPro" type="submit">Remover Produto</button>
				</form>
			</div>
		);
	}
}
export default RemoverProduto;