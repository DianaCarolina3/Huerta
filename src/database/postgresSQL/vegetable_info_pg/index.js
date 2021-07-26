const pool = require('../../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${table} SET request=$2, note=$3
    WHERE id_plant=$1`,
      [id, data.request, data.note],
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
