/* eslint-disable no-unused-vars */
const db = require('../connection')
console.log('Successfully connection to Firebase')

const vegetable_plot = require('../lib/vegetable_plot_fb')

async function insert_vege(table, data) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.insert(table, data)
  }
  //else if (table === 'vegetable') {
  //   return await vegetable.insert(table, data)
  // }
}

async function update_vege(table, data, id) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.update(table, data, id)
  }
  // else if (table === 'vegetable') {
  //     return await vegetable.update(table, data, id)
  //   } else if (table === 'vegetable_data') {
  //     return await vegetable_data.update(table, data, id)
  //   } else if (table === 'vegetable_info') {
  //     return await vegetable_info.update(table, data, id)
  //   } else if (table === 'vegetable_photo') {
  //     return await vegetable_photo.update(table, data, id)
  //   } else if (table === 'vegetable_place') {
  //     return await vegetable_place.update(table, data, id)
  //   } else if (table === 'vegetable_plague') {
  //     return await vegetable_plague.update(table, data, id)
  //   } else if (table === 'vegetable_transplant') {
  //     return await vegetable_transplant.update(table, data, id)
  //   } else if (table === 'vegetable_evolution') {
  //     return await vegetable_evolution.update(table, data, id)
  //   }
}

async function remove_vege(table, id, data) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.remove(table, id)
  } else if (table === 'vegetable') {
    // return await vegetable.remove(table, id, data)
  }
}

function conversionTimestamp(timestamp) {
  let time = new Date(timestamp * 1000)
  let year = time.getFullYear()
  let month = time.getUTCMonth()
  let day = time.getDate()
  let hour = time.getHours()
  let min = time.getMinutes()
  let sec = time.getSeconds()
  time = `${month}:${day}:${year}:${hour}:${min}:${sec}`
  return time
}

//FUNCTIONS LIST, GET, REMOVE DEFAULT
const list = (table) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).get()

    docRef
      .then((query) => {
        query.forEach((doc) => {
          let time_seconds = doc.data().creation_date.seconds
          let time = conversionTimestamp(time_seconds)
          return resolve([doc.data(), `Creation_date_time: ${time}`])
        })
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(id).get()

    docRef
      .then((doc) => {
        if (doc.exists) {
          let time_seconds = doc.data().creation_date.seconds
          let time = conversionTimestamp(time_seconds)
          return resolve([doc.data(), `Creation_date_time: ${time}`])
        } else {
          throw Error('No such document!')
        }
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(id).delete()

    docRef
      .then((doc) => {
        if (doc.exists) {
          return resolve(doc.id + ' deleted')
        } else {
          throw Error('No such document!')
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
  update_vege,
  remove_vege,
}
