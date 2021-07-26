const pool = require('../../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${table} SET place=$2, plant_in_one=$3
    WHERE id_plant=$1`,
      [id, data.place, data.plant_in_one],
      (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      }
    )
  })
}

module.exports = {
  update,
}
