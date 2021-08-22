const db = require('../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(id)

    if (data.live) {
      docRef.update({
        live: data.live,
      })
    } else if (data.status) {
      docRef.update({
        status: data.status,
      })
    } else if (data.last_review) {
      docRef.update({
        last_review: data.last_review,
      })
    } else {
      docRef.update({
        live: data.live,
        status: data.status,
        last_review: data.last_review,
      })
    }
    return resolve(data).catch((err) => reject(err.message))
  })
}

module.exports = {
  update,
}
