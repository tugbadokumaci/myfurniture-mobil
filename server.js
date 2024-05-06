const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createPool({
    host: '154.56.47.12',
    user: 'u574456636_tugba_web',
    password: 'T96531533d*',
    database: 'u574456636_furniture_web'
});

const app = express();

app.use(cors());

app.get('/products', function (req, res) {
    connection.query('SELECT * FROM Products', function (error, results, fields) {
        if (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/categories', (req, res) => {
    connection.query('SELECT * FROM Category', function (error, results, fields) {
        if (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/categories/:categoryId', (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    connection.query(`SELECT * FROM Products where CategoryID = ${categoryId}`, function (error, results, fields) {
        if (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    connection.query(`SELECT * FROM Products where ProductID = ${productId}`, function (error, results, fields) {
        if (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
