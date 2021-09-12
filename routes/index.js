var express = require('express');
var router = express.Router();

const customer = require('../controllers').customer;
const detail = require('../controllers').detail;
const product = require('../controllers').product;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/customer/:id', customer.getById);

router.get('/detail/:id', detail.getById);

router.get('/product/:id', product.getById);

router.get('customer/:id/details', detail.listDetails);

router.post('/customer', customer.add);

router.post('/detail', detail.add);

router.post('/product', product.add);

router.post('/order/:product_id/detail/:detail_id/', detail.addOrder);

router.put('/product/:id', product.update);

router.delete('/product/:id', product.delete);

module.exports = router;
