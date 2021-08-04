const pool = require('../../../../connection_pg')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    if (!data.status && !data.last_review) {
      pool.query(
        `UPDATE ${table}
        SET  live=$2
        WHERE id_plant=$1`,
        [id, data.live],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else if (!data.live && !data.last_review) {
      pool.query(
        `UPDATE ${table}
          SET  status=$2
          WHERE id_plant=$1`,
        [id, data.status],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else if (!data.status && !data.live) {
      pool.query(
        `UPDATE ${table}
          SET  last_review=$2
          WHERE id_plant=$1`,
        [id, data.last_review],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    } else {
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
    }
  })
}

module.exports = {
  update,
}
