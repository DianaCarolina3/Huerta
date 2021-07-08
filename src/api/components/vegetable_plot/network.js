const express = require('express')

const controller = require('./index')
const response = require('../../../response')

const router = express.Router()

//routes
router.get('/', list)
router.get('/:id', getItem)
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

function getItem(req, res, next) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

function insert(req, res, next) {
  controller
    .insert(req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch((err) => {
      response.error(
        req,
        res,
        'Internal error',
        500,
        `Value ${req.body.vegetable} existing.`
      )
      next(err)
    })
}

function update(req, res, next) {
  controller
    .update(req.body, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

function remove(req, res, next) {
  controller
    .remove(req.params.id)
    .then(() => {
      response.success(req, res, 'Successfully removed ' + req.params.id, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err.message)
      next(err)
    })
}

module.exports = router
