const db = require('../connection')
console.log('Successfully connection to Firebase')

const vegetable_plot = require('../lib/vegetable_plot_fb')
const vegetable = require('../lib/vegetable_fb')
const vegetable_data = require('../lib/vegetable_data_fb')
const vegetable_evolution = require('../lib/vegetable_evolution_fb')

async function insert_vege(table, data) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.insert(table, data)
  } else if (table === 'vegetable') {
    return await vegetable.insert(table, data)
  }
}

async function update_vege(table, data, id) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.update(table, data, id)
  } else if (table === 'vegetable') {
    return await vegetable.update(table, data, id)
  } else if (table === 'vegetable_data') {
    return await vegetable_data.update(table, data, id)
  } else if (table === 'vegetable_evolution') {
    return await vegetable_evolution.update(table, data, id)
  }
}

async function remove_vege(table, id) {
  if (table === 'vegetable_plot') {
    return await vegetable_plot.remove(table, id)
  } else if (table === 'vegetable') {
    return await vegetable.remove(table, id)
  }
}

//FUNCTIONS LIST, GET, REMOVE DEFAULT
const list = async (table) => {
  try {
    const data_list = await db.collection(table).get()
    const data = data_list.docs.map((doc) => [doc.data(), { id: doc.id }])
    return data
  } catch (error) {
    return error
  }
}

const get = async (table, id) => {
  try {
    const data_getId = await db
      .collection(table)
      .doc(id)
      .get()
      .then((docId) => {
        return [docId.data(), { id: docId.id }]
      })
    return data_getId
  } catch (error) {
    return error
  }
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
  list,
  get,
  remove,
  insert_vege,
  update_vege,
  remove_vege,
}
