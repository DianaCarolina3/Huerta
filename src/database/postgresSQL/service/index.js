const pool = require('../connection')

const vegetable_plot = require('../lib/vegetable_plot_pg')
const vegetable = require('../lib/vegetable_pg')
const vegetable_data = require('../lib/vegetable_data_pg')
const vegetable_info = require('../lib/vegetable_info_pg')
const vegetable_photo = require('../lib/vegetable_photo_pg')
const vegetable_place = require('../lib/vegetable_place_pg')
const vegetable_plague = require('../lib/vegetable_plague_pg')
const vegetable_transplant = require('../lib/vegetable_transplant_pg')
const vegetable_evolution = require('../lib/vegetable_evolution_pg')

//vegetables
async function insert_vege(table, data) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.insert(table, data)
  } else if (table === 'vegetable') {
    return await vegetable.insert(table, data)
  }
}

async function update_vege(table, data, id) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.update(table, data, id)
  } else if (table === 'vegetable') {
    return await vegetable.update(table, data, id)
  } else if (table === 'vegetable_data') {
    return await vegetable_data.update(table, data, id)
  } else if (table === 'vegetable_info') {
    return await vegetable_info.update(table, data, id)
  } else if (table === 'vegetable_photo') {
    return await vegetable_photo.update(table, data, id)
  } else if (table === 'vegetable_place') {
    return await vegetable_place.update(table, data, id)
  } else if (table === 'vegetable_plague') {
    return await vegetable_plague.update(table, data, id)
  } else if (table === 'vegetable_transplant') {
    return await vegetable_transplant.update(table, data, id)
  } else if (table === 'vegetable_evolution') {
    return await vegetable_evolution.update(table, data, id)
  }
}

async function remove_vege(table, id, data) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.remove(table, id)
  } else if (table === 'vegetable') {
    return await vegetable.remove(table, id, data)
  }
}

//FUNCTIONS LIST, GET, REMOVE DEFAULT
const list = (table) => {
  return new Promise((resolve, reject) => {
    if (table === 'vegetable_plot' || table === 'vegetable') {
      pool.query(`SELECT * FROM "${table}" ORDER BY id ASC `, (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      })
    } else {
      pool.query(`SELECT * FROM "${table}"`, (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      })
    }
  })
}

const get = async (table, id) => {
  return new Promise((resolve, reject) => {
    if (table === 'vegetable_plot' || table === 'vegetable') {
      pool.query(
        `SELECT * FROM "${table}" WHERE id=$1`,
        [id],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else {
      pool.query(
        `SELECT * FROM "${table}" WHERE id_plant=$1`,
        [id],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    }
  })
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    if (table === 'vegetable_plot' || table === 'vegetable') {
      pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id], (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      })
    } else {
      pool.query(
        `DELETE FROM "${table}" WHERE id_plant=$1`,
        [id],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    }
  })
}

module.exports = {
  list,
  get,
  remove,
  //vagetables
  insert_vege,
  update_vege,
  remove_vege,
}
