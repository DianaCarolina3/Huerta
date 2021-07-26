const pool = require('../../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${table} SET photo=$2, date_photo=$3
    WHERE id_plant=$1`,
      [id, data.photo, data.date_photo],
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
