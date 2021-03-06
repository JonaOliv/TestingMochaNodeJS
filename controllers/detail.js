'use strict';

const Detail = require('../models').Detail;

module.exports = {
  addOrder(req, res) {
    var listInterests = req.body.listInterests;
    return Order.bulkCreate(listInterests, { updateOnDuplicate: ['amount', 'update_at'] })
      .then((orders) => res.status(201).send(orders))
      .catch((error) => res.status(400).send(error));
  },
  listDetails(req, res) {
    return Detail
      .findAll({
        where: {
          customer_id: req.params.customer_id
        }
      })
      .then((Details) => res.status(200).send(Details))
      .catch((error) => { res.status(400).send(error); });
  },
  list(req, res) {
    return Detail
      .findAll({})
      .then((Details) => res.status(200).send(Details))
      .catch((error) => { res.status(400).send(error); });
  },
  getById(req, res) {
    return Detail
      .findByPk(req.params.id, {})
      .then((Detail) => {
        if (!Detail) {
          return res.status(404).send({
            message: 'Detail Not Found',
          });
        }
        return res.status(200).send(Detail);
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Detail
      .create({
        name: req.body.name
      })
      .then((Detail) => res.status(201).send(Detail))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Detail
      .findByPk(req.params.id, {})
      .then(Detail => {
        if (!Detail) {
          return res.status(404).send({
            message: 'Detail Not Found',
          });
        }
        return Detail
          .update({
            name: req.body.name || Detail.name,
          })
          .then(() => res.status(200).send(Detail))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    return Detail
      .findByPk(req.params.id)
      .then(Detail => {
        if (!Detail) {
          return res.status(400).send({
            message: 'Detail Not Found',
          });
        }
        return Detail
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};
