const pool = require('../../connection')

//vegetable_plot
const insert_vegetable = require('./vegetable_plot_pg')

//vegetable_plot
async function insert(table, data) {
  return await insert_vegetable.insert(table, data)
}

//FUNCTIONS LIST, GET, REMOVE DEFAULT
const list = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}" ORDER BY id ASC`, (err, result) => {
      if (err) return reject(err)

      resolve(result.rows)
    })
  })
}

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)

      resolve(result.rows)
    })
  })
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)

      resolve(result.rows)
    })
  })
}

module.exports = {
  list,
  get,
  remove,
  //vegetable_plot
  insert,
}
