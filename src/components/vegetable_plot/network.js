const express = require('express')

const controller = require('./index')
const response = require('../../response')

const router = express.Router()

router.get('/', list)
router.get('/:id', getItem)
router.post('/', insert)
// router.get('/', update)
// router.get('/', remove)

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
      response.error(req, res, 'Internal error', 500, err)
      next(err)
    })
}

module.exports = router
