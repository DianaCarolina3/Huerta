const pool = require('../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    if (!data.plague || data.plague === undefined) {
      pool.query(
        `UPDATE ${table} SET plague_type=$2
      WHERE id_plant=$1`,
        [id, data.plague_type],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else if (!data.plague_type || data.plague_type === undefined) {
      pool.query(
        `UPDATE ${table} SET plague=$2
      WHERE id_plant=$1`,
        [id, data.plague],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else {
      pool.query(
        `UPDATE ${table} SET plague=$2, plague_type=$3
      WHERE id_plant=$1`,
        [id, data.plague, data.plague_type],
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
