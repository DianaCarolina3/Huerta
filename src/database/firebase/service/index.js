const db = require('../connection')
console.log('Successfully connection to Firebase')

const vegetable_plot = require('../lib/vegetable_plot_fb')

const insert_vege = async (table, data) => {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.insert(table, data)
  }
}

const list = async (table) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc('vege').get()

    docRef
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data())
        } else {
          console.log('No such document!')
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const get = async (table) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc('vege').get()

    docRef
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data())
        } else {
          console.log('No such document!')
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const remove = async (table) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc('vege').get()

    docRef
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data())
        } else {
          console.log('No such document!')
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  list,
  get,
  remove,
  insert_vege,
}
