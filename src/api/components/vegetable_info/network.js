const express = require('express')

const controller = require('./index')
const response = require('../../../response')

const router = express.Router()

//ROUTES
router.get('/', list)
router.get('/:id_plant', getItem)
router.put('/:id_plant', update)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal Error', 500, err)
      next(err)
    })
}

function getItem(req, res, next) {
  controller
    .get(req.params.id_plant)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal Error', 500, err)
      next(err)
    })
}

function update(req, res, next) {
  controller
    .update(req.params.id_plant, req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Internal Error', 500, err)
      next(err)
    })
}

module.exports = router
