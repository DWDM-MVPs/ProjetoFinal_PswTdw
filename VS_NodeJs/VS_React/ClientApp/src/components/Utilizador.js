import React, { Component} from 'react';
import '../css/Login.css';

class Utilizador extends Component {
    constructor(children) {
		super(children)
		this.state = {
			name: "",
		};
    }
    pedirUsers() {
		const res = fetch("http://83.132.83.200:1337/api/produtos/get-user", {
			method: "post",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					users: responseJson,
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
						this.state.users.map((users,index)=>{
							
							return(
								<div key={index} id="caixaProduto">
								<h1>{users.name}</h1>	
								</div>
							)
						})
					}

				</div>
			);
		}
	}
}
export default Utilizador;