import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			usernumb: '',
			password: '',
			error: '',
		};

		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dismissError = this.dismissError.bind(this);
	}

	dismissError() {
		this.setState({ error: '' });
	}

	handleSubmit(evt) {
		evt.preventDefault();

		var user = this.state.usernumb;
		var pass = this.state.password;

		if (!this.state.usernumb) {
			return this.setState({ error: 'User Number is required' });
		}

		if (!this.state.password) {
			return this.setState({ error: 'Password is required' });
		}
		if (user === "admin" && pass === "admin") {
			return alert("You are an admin")
		}
		return this.setState({ alert: 'Successful login' });
	}

	handleUserChange(evt) {
		this.setState({
			usernumb: evt.target.value,
		});
	};

	handlePassChange(evt) {
		this.setState({
			password: evt.target.value,
		});
	};


	
	render() {

		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					{
						this.state.error &&
						<h3 data-test="error" onClick={this.dismissError}>
							<button onClick={this.dismissError}>✖</button>
							{this.state.error}
						</h3>
					}
					<div id="cenas">
						<br />
						<input type="text" placeholder="Username" data-test="usernumb" value={this.state.usernumb} onChange={this.handleUserChange} />
						<br />
						<br />
						<input type="password" placeholder="Password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
						<br />
						<input type="submit" value="Log In" data-test="submit" id="subm" />

					</div>
					<button >XD</button>
				</form>
			</div>
		);
	}
}

export default Login;