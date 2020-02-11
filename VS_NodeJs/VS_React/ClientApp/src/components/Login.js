import React, { Component } from "react";


export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: "",
			password: ""
		};
	}


	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	}


	onSubmit = (event) => {
		event.preventDefault();
		fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.status === 200) {
					alert("login efetuado com sucesso");
					this.props.history.push('/');
				}
				else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch(err => {
				console.error(err);
				alert('Error logging in please try again');
			});
	}


	render() {
		return (
			<form onSubmit={this.onSubmit} id="login">
				<h1>Login Below!</h1>
				<br/>
				<input
					type="email"
					name="email"
					placeholder="Enter email"
					value={this.state.name}
					onChange={this.handleInputChange}
					required
				/>
				<br/>
				<br/>
				<input
					type="password"
					name="password"
					placeholder="Enter password"
					value={this.state.password}
					onChange={this.handleInputChange}
					required
				/>
				<br/>
				<br/>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}