import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/NavMenu.css';

export class NavMenu extends Component
{
				displayName = NavMenu.name

				render()
				{
								return (
												<Navbar inverse fixedTop fluid collapseOnSelect>
																<Navbar.Header>
																				<Navbar.Brand>
																								<Link to={'/login'}>Bar Escolar</Link>
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

																								<LinkContainer to={'/dashboard'}>
																												<NavItem>
																																<Glyphicon glyph='list-alt' /> Dashboard
							</NavItem>
																								</LinkContainer>

																								<LinkContainer to={'/editarProduto'} exact>
																												<NavItem>
																																<Glyphicon glyph='list-alt' /> Editar Produto
							</NavItem>
																								</LinkContainer>

																								<LinkContainer to={'/adicionarProduto'} exact>
																												<NavItem>
																																<Glyphicon glyph='list-alt' /> Adicionar Produto
							</NavItem>
																								</LinkContainer>
																				</Nav>
																</Navbar.Collapse>
																<Nav>
																</Nav>
												</Navbar>

								);
				}
}