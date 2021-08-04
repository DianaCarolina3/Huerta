const express = require('express')

const response = require('../../../response')
const controller = require('./index')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/:id_plant', getItem)
router.patch('/:id_plant', update)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err.message)
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
      response.error(req, res, 'Internal error', 500, err.message)
      next(err)
    })
}

function update(req, res, next) {
  controller
    .update(req.params.id_plant, req.body)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err.message)
      next(err)
    })
}

module.exports = router
