import Produtos from "./components/Produtos";

var serverIp = "192.168.43.138:1337";
var routeProdutos = "http://" + serverIp + "/api/produtos";
var routeUsers = "http://" + serverIp + "/api/users";

export function PRODUTOS_GET_PRODUTOS() {
	fetch(routeProdutos + "/get-produtos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function PRODUTOS_GET_PRODUTO(name) {
	fetch(routeProdutos + "/get-produtos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: { name: name },
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function PRODUTOS_NEW_PRODUTO(name, stock, price, allergens, isActive) {
	fetch(routeProdutos + "/add-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(
			{
				name: name,
				stock: stock,
				price: price,
				allergens: allergens,
				isActive: isActive,
			}
		),
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function PRODUTOS_UPDATE_PRODUTO(Produto) {
	fetch(routeProdutos + "/update-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(Produto)
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function PRODUTOS_UPDATE_PRODUTO_ONLY_PRICE(name, price) {
	fetch(routeProdutos + "/update-produto/only-price", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
			price: price,
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function PRODUTOS_UPDATE_PRODUTO_ONLY_STOCK(name, stock) {
	fetch(routeProdutos + "/update-produto/only-stock", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
			stock: stock,
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function PRODUTOS_DELETE_PRODUTO(name) {
	fetch(routeProdutos + "/delete-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function USERS_GET_USER_BY_NAME(name) {
	fetch(routeUsers + "/get-user/by-name", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function USERS_UPDATE_CARRINHO(name, jsonCarrinho) {
	fetch(routeUsers + "/users/update-carrinho", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function USERS_LOGIN(name,password) {
	fetch(routeUsers + "/users/update-carrinho", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
			password:password,
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
}

export function USERS_CLOSE_CARRINHO() {

}