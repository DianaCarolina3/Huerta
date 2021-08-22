const db = require('../../connection')

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(data.id)

    docRef
      .set({
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

const remove = async (table, id) => {
  try {
    const docRef = await db.collection(table).doc(id)
    docRef.delete()
    return id + ' deleted'
  } catch (error) {
    return error
  }
}

module.exports = {
  insert,
  update,
  remove,
}
