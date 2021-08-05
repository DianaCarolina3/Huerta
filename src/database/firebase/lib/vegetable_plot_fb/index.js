const db = require('../../connection/')

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc('vege')

    docRef
      .set({
        id: data.id,
        data: data.data,
        creation_date: data.creation_date,
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  insert,
}
