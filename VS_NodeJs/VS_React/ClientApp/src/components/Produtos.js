import React, { Component } from "react";
import ProdList from '../components/ProdList'

export class Produtos extends Component {
	displayName = Produtos.name

	constructor(props) {
		super(props);
		this.state = {
			ProdList: [] ,
		};
	}


	render() {

		return (
			<div>
				<h1>Produtos</h1>
				<ProdInfo name="Teste" price="3" />
							{
								Object.keys(this.state.ProdList).map((name, e) => {
									if (this.state.ProdList.includes(e)) {
										return (<ProdInfo name={Prod.name} price={Prod.price} />)
									}
									else return null;
								}
								)        
							}
			</div>
		);
	}
}
export default Produtos;  