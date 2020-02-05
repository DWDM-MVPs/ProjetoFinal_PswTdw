import React, { Component } from 'react';
class Dashboard extends Component {
  constructor(){
    super();
    this.state={
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
        body: JSON.stringify({ name: "", stock:' ',price:' ',allergens:' ', isActive:' ' }),
        
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

        handleChangeName(event){
          this.setState({textName: event.target.value});
        }
        handleChangeStock(event){
          this.setState({textStock: event.target.value});
        }

    render() {
      return (
        <div className="Component">
        <div>
          <form action="/action_page.php">
            
          Name:<br/>
          <input type="text" name="name" onChange={this.handleChangeName}/>
          <br/>
          <br/>
          Stock:<br/>
          <input type="number" name="stock" onChange={this.handleChangeStock}/>
          <br/>
          <br/>
          Price:<br/>
          <input type="number" name="price"/>
          <br/>
          <br/>
          Allergens:<br/>
          <input type="radio" name="allergens"/>
          <br/>
          <br/>
          Is Active?:<br/>
          <input type="radio" name="isActive"/>
          <br/><br/>
          <button id="AddPro" onClick={this.adicionarProduto}>Adicionar Produto</button>
          </form> 
          <button onClick={() => alert(this.state.textName)}>testar</button>
        </div>
        <button id="AddPro" onClick={this.adicionarProduto}>Adicionar Produto</button>
        <button id="RemPro" onClick={this.removerProduto}>Remover Produto</button>
        <button id="EdPro"  onClick={this.editarProduto}>Editar Produto</button>
        </div>
      );
    }
  }
  
  export default Dashboard;
