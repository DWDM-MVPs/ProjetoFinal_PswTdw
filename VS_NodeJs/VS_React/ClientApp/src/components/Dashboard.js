import React, { Component } from 'react';


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      textName: null,
      textStock: null,
      textPrice: null,
      textAllergens: null,
      textIsActive: null,
    }
  }


  adicionarProduto() {
    const res = fetch('http://192.168.43.138:1337/api/produtos/add-produto', {
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

  removerProduto() {
    const res = fetch('http://192.168.43.138:1337/api/produtos/delete-produto', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'produto2' }),
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

  editarProduto() {
    const res = fetch('http://192.168.43.138:1337/api/produtos/get-produtos', {
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

  render() {
    return (
      <div className="Component">
        <div>
          <form action="/action_page.php">

            Name:<br />
            <input type="text" name="name"/>
            <br />
            <br />
            Stock:<br />
            <input type="number" name="stock"/>
            <br />
            <br />
            Price:<br />
            <input type="number" name="price"/>
            <br />
            <br />
            Allergens:<br />
            <input type="radio" name="allergens"/>
            <br />
            <br />
            Is Active?:<br />
            <input type="radio" name="isActive"/>
            <br /><br />
            <button id="AddPro" onClick={this.adicionarProduto}>Adicionar Produto</button>
          </form>
          <button onClick={() => alert(this.state.textName)}>testar</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;

/*
           <input type="text" name="name" onChange={(e) => this.updateEvent(e, "name")} value={this.props.ProdList.name} />
*/