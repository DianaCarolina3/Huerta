const db = require('../../connection')

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(id)

    if (data.date) {
      docRef.update({
        date: data.date,
      })
    } else if (data.height_width) {
      docRef.update({
        height_width: data.height_width,
      })
    } else if (data.thick) {
      docRef.update({
        thick: data.thick,
      })
    } else {
      docRef.update({
        date: data.date,
        height_width: data.height_width,
        thick: data.thick,
      })
    }
    return resolve(data).catch((err) => reject(err.message))
  })
}

module.exports = {
  update,
}
