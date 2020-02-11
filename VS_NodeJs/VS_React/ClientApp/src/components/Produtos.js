import React, { Component } from "react";

export class Produtos extends Component
{
				displayName = Produtos.name

				constructor(props)
				{
								super(props);
								this.state = {
												JsonProdutos: null,
												ArrayProdutos: null,
								};
				}

				componentDidMount()
				{
								this.pedirProdutos();
				}

				pedirProdutos()
				{
								const res = fetch("http://192.168.43.138:1337/api/produtos/get-produtos", {
												method: "post",
												headers: { "Content-Type": "application/json" },
								})
												.then((response) => response.json())
												.then((responseJson) =>
												{
																console.log(responseJson);
																this.setState({
																				JsonProdutos: responseJson,
																});
																this.pushJsonToArray();
												})
												.catch((error) =>
												{
																console.error(error);
												});
								console.log(res);
				}

				pushJsonToArray()
				{
								console.log("" + this.state.jsonProdutos + "");
								console.log("pushtoarray 1");
								var obj = JSON.parse(this.state.JsonProdutos);
								console.log("obj:");
								console.log(obj);
								var arr = [];
								Object.keys(this.state.JsonProdutos).forEach(function (key)
								{
												console.log("lmaoooo");
												arr.push(this.state.JsonProdutos[key]);
								});
								console.log("pushtoarray 2");
								this.setState({
												ArrayProdutos: arr,
								});
								console.log(this.state.ArrayProdutos);
				}

				render()
				{

								return (
												<div>
																<h1>Produtos</h1>
																<button onClick={() => console.log(this.state.JsonProdutos)}>Click</button>
												</div>
								);
				}
}
export default Produtos;  




