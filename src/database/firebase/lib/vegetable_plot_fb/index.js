const db = require('../../connection')

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(data.id)

    docRef
      .set({
        id: data.id,
        data: data.data,
        creation_date: data.creation_date,
      })
      .then((data) => {
        return resolve(data)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(id)

    docRef
      .update({
        data: data.data,
        creation_date: data.creation_date,
      })
      .then((data) => {
        return resolve(data)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(id)

    docRef
      .delete((doc) => {
        if (doc.exists) {
          return resolve(doc.id + ' deleted')
        }
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

module.exports = {
  insert,
  update,
  remove,
}
