const express = require('express')

const response = require('../../../response')
const controller = require('./index')

const router = express.Router()

//routes
router.get('/:table', list)
router.get('/:table/:id', getItem)
// router.post('/:table', insert)
// router.put('/:table/:id', update)
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

function remove(req, res, next) {
  controller
    .remove(req.params.table, req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

module.exports = router
