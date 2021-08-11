const pool = require('../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    if (!data.request) {
      pool.query(
        `UPDATE ${table} SET note=$2
      WHERE id_plant=$1`,
        [id, data.note],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else if (!data.note) {
      pool.query(
        `UPDATE ${table} SET request=$2
      WHERE id_plant=$1`,
        [id, data.request],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else {
      pool.query(
        `UPDATE ${table} SET request=$2, note=$3
      WHERE id_plant=$1`,
        [id, data.request, data.note],
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
