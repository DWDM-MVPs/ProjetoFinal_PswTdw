import React, { Component } from 'react';

class AdicionarProduto extends Component {
  constructor(props) {
		super(props);
		this.state = {
			Produto: {
        name: null,
        stock:"",
				price: "",
				allergens: "",
				isActive: "",
			},
		}
	}
  render() {
    return (
      <div>
        <form action="/action_page.php">

          Name:<br />
          <input type="text" name="name" onChange={this.handleChangeName} />
          <br />
          <br />
          Stock:<br />
          <input type="number" name="stock" onChange={this.handleChangeStock} />
          <br />
          <br />
          Price:<br />
          <input type="number" name="price" />
          <br />
          <br />
          Allergens:<br />
          <input type="radio" name="allergens" />
          <br />
          <br />
          Is Active?:<br />
          <input type="radio" name="isActive" />
          <br /><br />
          <button id="AddPro" onClick={this.adicionarProduto}>Adicionar Produto</button>
        </form>
        <button onClick={() => alert(this.state.textName)}>testar</button>
      </div>
    );
  }
}

export default AdicionarProduto;