'use strict';

const Customer = require('../models').Customer;

module.exports = {
  list(req, res) {
    return Customer
      .findAll({})
      .then((Customers) => res.status(200).send(Customers))
      .catch((error) => { res.status(400).send(error); });
  },
  getById(req, res) {
    return Customer
      .findByPk(req.params.id, {})
      .then((Customer) => {
        if (!Customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return res.status(200).send(Customer);
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Customer
      .create({
        name: req.body.name
      })
      .then((Customer) => res.status(201).send(Customer))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Customer
      .findByPk(req.params.id, {})
      .then(Customer => {
        if (!Customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return Customer
          .update({
            name: req.body.name || Customer.name,
          })
          .then(() => res.status(200).send(Customer))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    return Customer
      .findByPk(req.params.id)
      .then(Customer => {
        if (!Customer) {
          return res.status(400).send({
            message: 'Customer Not Found',
          });
        }
        return Customer
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};
