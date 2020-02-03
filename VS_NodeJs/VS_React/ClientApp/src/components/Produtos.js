import React, { Component } from "react";
import NavMenu from '../components/NavMenu';

export class Produtos extends Component {
	displayName = Produtos.name

	constructor(props) {
		super(props);
		this.state = {
			produtos: [],
			loading: true
		};
	}

	componentDidMount() {
		const res = fetch('http://192.168.242.200:1337/api/produtos/get-produtos', {
			method: 'post',
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

	static renderTableProdutos(produtos) {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Nome</th>
						<th>Preço</th>
						<th>Alergénios</th>
					</tr>
				</thead>
				<tbody>
					{this.state.produtos.map(produtos =>
						<tr key={produtos.name}>
							<td>{produtos.price}</td>
							<td>{produtos.allergens}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: Produtos.renderTableProdutos(this.state.produtos);

		return (
			<div>
				<h1>Produtos</h1>
				{contents}
			</div>
		);
	}
}
export default Produtos;