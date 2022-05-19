const express = require("express");
const { Product } = require("./models")
const app = express()

const PORT = 8080;

app.use(express.urlencoded({ extended:false}));

app.set("view engine", "ejs");

app.get('/products', (req, res) => {
    Product.findAll()
        .then(products => {
            res.render('products/index', {
                products
            })
        })
})

app.get('/products/create', (req, res) => {
    res.render('products/create')
})

app.post('/products', (req, res) => {
    Product.create({
        productname: req.body.productname,
        productprice: req.body.productprice,
        quantity: req.body.quantity,
        type: req.body.type,
        keterangan: req.body.keterangan
    })
        .then(product => {
            res.redirect('/products')
        });
});

app.get('/products/:id', (req, res) => {
    Product.findOne({
        where: { id: req.params.id }
    })
        .then(product => {
            res.render('products/show', product.dataValues)
        })
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});