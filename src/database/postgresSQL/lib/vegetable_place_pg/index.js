const pool = require('../../../../connection_pg')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    if (!data.place) {
      pool.query(
        `UPDATE ${table} SET plant_in_one=$2
      WHERE id_plant=$1`,
        [id, data.plant_in_one],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else if (!data.plant_in_one) {
      pool.query(
        `UPDATE ${table} SET place=$2
      WHERE id_plant=$1`,
        [id, data.place],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else {
      pool.query(
        `UPDATE ${table} SET place=$2, plant_in_one=$3
      WHERE id_plant=$1`,
        [id, data.place, data.plant_in_one],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    }
  })
}

module.exports = {
  update,
}
