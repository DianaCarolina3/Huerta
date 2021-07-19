const express = require('express')

const response = require('../../../response')
const controller = require('./index')

const router = express.Router()

//routes
router.get('/:table', list)
router.get('/', list_vegetable)
router.get('/:table/:id', getItem)
router.post('/', insert)
router.put('/:table/:id', update)
router.delete('/:table/:id', remove)

function list(req, res, next) {
  controller
    .list(req.params.table)
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
    .get(req.params.table, req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

function list_vegetable(req, res, next) {
  const table = 'vegetable'
  controller
    .list(table)
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
    .insert(req.query.IDvege, req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

function update(req, res, next) {
  controller
    .update(req.params.table, req.body, req.params.id)
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
    .remove(req.params.table, req.params.id)
    .then(() => {
      response.success(req, res, req.params.id + ' deleted', 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

module.exports = router
