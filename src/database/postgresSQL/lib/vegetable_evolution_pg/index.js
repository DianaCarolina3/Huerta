const pool = require('../../connection')

const update = (table, data, id) => {
  if (!data.date) {
    throw new Error('No date specified in request')
  }

  return new Promise((resolve, reject) => {
    if (!data.thick) {
      pool.query(
        `UPDATE ${table} SET height_width=$2 ,date=$3
      WHERE id_plant=$1`,
        [id, data.height_width, data.date],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else if (!data.height_width) {
      pool.query(
        `UPDATE ${table} SET thick=$2 ,date=$3
      WHERE id_plant=$1`,
        [id, data.thick, data.date],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else {
      pool.query(
        `UPDATE ${table} SET height_width=$2 ,thick=$3 ,date=$4
      WHERE id_plant=$1`,
        [id, data.height_width, data.thick, data.date],
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
