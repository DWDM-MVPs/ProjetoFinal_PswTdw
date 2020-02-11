
var serverIp = "83.132.83.200:1337";
var routeProdutos = "http://" + serverIp + "/api/produtos";
var routeUsers = "http://" + serverIp + "/api/users";

export function PRODUTOS_GET_PRODUTOS() {
	fetch(routeProdutos + "/get-produtos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	}).then((response) => {return response});
}

export function PRODUTOS_GET_PRODUTO(name) {
	fetch(routeProdutos + "/get-produtos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: { name: name },
	}).then((response) => {return response});
}

export function PRODUTOS_NEW_PRODUTO(name, stock, price, allergens, isActive) {
	fetch(routeProdutos + "/add-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(
			{
				token: localStorage.getItem("token"),
				name: name,
				stock: stock,
				price: price,
				allergens: allergens,
				isActive: isActive,
			}
		),
	}).then((response) => {return response});
}

export function PRODUTOS_UPDATE_PRODUTO(oldName, name, stock, price, allergens, isActive) {
	fetch(routeProdutos + "/update-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(
			{
				token: localStorage.getItem("token"),
				oldName: oldName,
				name: name,
				stock: stock,
				price: price,
				allergens: allergens,
				isActive: isActive,
			}
		),
	}).then((response) => {return response});
}

export function PRODUTOS_UPDATE_PRODUTO_ONLY_STOCK(name, stock) {
	fetch(routeProdutos + "/update-produto/only-stock", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			token: localStorage.getItem("token"),
			name: name,
			stock: stock,
		},
	}).then((response) => {return response});
}

export function PRODUTOS_DELETE_PRODUTO(name) {
	fetch(routeProdutos + "/delete-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			token: localStorage.getItem("token"),
			name: name,
		},
	}).then((response) => {return response});
}

export function USERS_GET_USER_BY_NAME(name) {
	fetch(routeUsers + "/get-user/by-name", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
		},
	}).then((response) => {return response});
}

export function USERS_GET_USER_BY_TOKEN() {
	fetch(routeUsers + "/get-user/by-token", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			token: localStorage.getItem("token"),
		},
	}).then((response) => {return response});
}

export function USERS_CARRINHO_ADD_PRODUTO(name) {
	fetch(routeUsers + "/carrinho/add-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			token: localStorage.getItem("token"),
			name: name,
		}
	}).then((response) => {return response});
}

export function USERS_CARRINHO_REMOVE_PRODUTO(name) {
	fetch(routeUsers + "/carrinho/remove-produto", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			token: localStorage.getItem("token"),
			name: name,
		}
	}).then((response) => {return response});
}

export function USERS_CLOSE_CARRINHO() {
	fetch(routeUsers + "/carrinho/close-carrinho", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			token: localStorage.getItem("token"),
		}
	}).then((response) => {return response});
}

export function USERS_LOGIN(name, password) {
	fetch(routeUsers + "/users/update-carrinho", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: {
			name: name,
			password: password,
		},
	}).then((response) => {return response});
}