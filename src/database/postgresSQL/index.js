const pool = require('../../connection')

//vegetable_plot
const vegetable_plot = require('./vegetable_plot_pg')

//vegetable_plot
async function insert_vege(table, data) {
  return await vegetable_plot.insert(table, data)
}
async function update_vege(table, data, id) {
  return await vegetable_plot.update(table, data, id)
}
async function remove_vege(table, id) {
  return await vegetable_plot.remove(table, id)
}

//FUNCTIONS LIST, GET, REMOVE DEFAULT
const list = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}" ORDER BY id ASC `, (err, result) => {
      if (err) return reject(err)

      resolve(result.rows)
    })
  })
}

const listPlant = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" ORDER BY id_plant ASC `,
      (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      }
    )
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

const getPlant = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE id_plant=$1`,
      [id],
      (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      }
    )
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
  insert_vege,
  update_vege,
  remove_vege,
  //vagetable
  getPlant,
  listPlant,
}
