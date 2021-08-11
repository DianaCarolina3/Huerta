const pool = require('../../connection')

const update = (table, data, id) => {
  if (!data.transplant_date) {
    throw new Error('No transplant_date specified in request')
  }

  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${table} SET transplant=$2, transplant_date=$3
    WHERE id_plant=$1`,
      [id, data.transplant, data.transplant_date],
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
