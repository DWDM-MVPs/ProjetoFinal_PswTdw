import React, { Component } from "react";
import '../css/Produtos.css';

export class Produtos extends Component {

	render() {

		return (
			<div>
				<h1>Produtos</h1>
				<div id="caixaProduto">
					<div id="Texto">
					Nome:{Produtos.nome}<br/>
					Custo:{Produtos.custo}<br/>
					Stock:{Produtos.stock}<br/>
					Alergénios:{Produtos.allergenios}<br/>
					</div>
				</div>
			</div>
		);
	}
}
export default Produtos;  




