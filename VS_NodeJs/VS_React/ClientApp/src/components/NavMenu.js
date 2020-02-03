import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/NavMenu.css';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';

export class NavMenu extends Component {
	displayName = NavMenu.name

	render() {
		var dashboard;
		if (true) {
			dashboard = (
				<LinkContainer to={'/dashboard'}>
				<NavItem>
					<Glyphicon glyph='list-alt' /> Dashboard
								</NavItem>
			</LinkContainer>);
		}

		return (
			<Navbar inverse fixedTop fluid collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to={'/'}>Bar Escolar</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to={'/'} exact>
							<NavItem>
								<Glyphicon glyph='apple' /> Produtos
							 </NavItem>
						</LinkContainer>

						<LinkContainer to={'/carrinho'}>
							<NavItem>
								<Glyphicon glyph='shopping-cart' /> Carrinho
							  </NavItem>
						</LinkContainer>

						<LinkContainer to={'/login'}>
							<NavItem>
								<Glyphicon glyph='log-in' /> Login
							</NavItem>
						</LinkContainer>
						{dashboard}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
