const pool = require('../../../../connection_pg')

const update = (table, data, id) => {
  if (!data.transplant_date) {
    throw new Error('No date_photo specified in request')
  }

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
