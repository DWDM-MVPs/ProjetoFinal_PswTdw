import React, { Component } from "react";
import '../css/Produtos.css';

export class Produtos extends Component {
	displayName = Produtos.name

	constructor(props) {
		super(props);
		this.state = {
			JsonProdutos: [],
			ArrayProdutos: {},
			isLoading:true
		};
	}

	componentWillMount() {
		this.pedirProdutos();
	}

	pedirProdutos() {
		const res = fetch("http://192.168.43.138:1337/api/produtos/get-produtos", {
			method: "post",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					JsonProdutos: responseJson,
					isLoading:false
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {

		if(this.state.isLoading){
		return(<div>Is loading...</div>)
		}else{
			return (
				<div>
					<h1>Produtos</h1>
					{
						this.state.JsonProdutos.map((produto,index)=>{
							
							return(
								<div key={index} id="caixaProduto">
								<h1>{produto.name}</h1>
								<h1>{produto.price}€</h1>
								<h1>{produto.stock} unidades</h1>
								<h1>{produto.allergens}</h1>	
								</div>
							)
						})
					}
				</div>
			);
		}
	}



}
export default Produtos;




