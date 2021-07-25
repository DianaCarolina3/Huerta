const pool = require('../../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${table}
      SET  live=$2, status=$3, last_review=$4
      WHERE id_plant=$1`,
      [id, data.live, data.status, data.last_review],
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
