const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// LIST AVAILABLE PRODUCTS
app.get('/api/products', (req, res) => {
    return res.json(data.products);
});

// LIST PRODUCTS IN CART
app.post('/api/products', (req, res) => {
    let products = [], id = null;
    let cart = JSON.parse(req.body.cart);
    if (!cart) return res.json(products)
    for (var i = 0; i < data.products.length; i++) {
        id = data.products[i].id.toString();
        if (cart.hasOwnProperty(id)) {
            data.products[i].qty = cart[id]
            products.push(data.products[i]);
        }
    }
    return res.json(products);
});

// LOGIN
app.post('/api/auth', (req, res) => {
    let user = data.users.filter((user) => {
        return user.name == req.body.name && user.password == req.body.password;
    });

    if (user != null) {
        // TOKEN
        let token = jwt.sign({ name: user[0].name, password: user[0].password }, "jwt_secret_password", { expiresIn: '2h' });

        let response = {
            message: 'Token Created, Authentication Successful!',
            token: token
        };

        return res.status(200).json(response);

    } else {
        return res.status("401").json("Authentication failed. admin not found.");
    }
});

// CHECKOUT
app.get('/api/pay', middleware, (req, res) => {
    return res.json("Payment Successful!");
});

const port = 3000;
app.listen(port);
console.log("Express running on port: " + port);