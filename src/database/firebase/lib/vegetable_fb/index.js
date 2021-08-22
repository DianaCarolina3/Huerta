const db = require('../../connection')

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(data.id)

    docRef
      .set({
        vegetable: data.vegetable,
        id_vegetable: data.id_vegetable,
        sowing_date: data.sowing_date,
      })
      .then((data) => {
        return resolve(data)
      })
      .catch((err) => {
        return reject(err)
      })

    //inserta y crea datos en vegetable_data
    const vege_data = db.collection('vegetable_data').doc(data.id)
    vege_data
      .set({
        id_plant: data.id,
        live: true,
        status: ['Nueva'],
        last_review: '0000',
      })
      .catch((err) => {
        return err
      })

    //inserta y crea datos en vegetable_evolution
    const vege_evolution = db.collection('vegetable_evolution').doc(data.id)
    vege_evolution
      .set({
        id_plant: data.id,
        date: '0000',
        height_width: ['cm', 'cm'],
        thick: ['cm'],
      })
      .catch((err) => {
        return err
      })
  })
}

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    const docRef = db.collection(table).doc(id)

    docRef
      .update({
        id_vegetable: data.id_vegetable,
        sowing_date: data.sowing_date,
      })
      .then((data) => {
        return resolve(data)
      })
      .catch((err) => {
        return reject(err.message)
      })
  })
}

const remove = async (table, id) => {
  try {
    const docRef = await db.collection(table).doc(id)
    docRef.delete()

    const vege_data = await db.collection('vegetable_data').doc(id)
    vege_data.delete()

    const vege_evolution = await db.collection('vegetable_evolution').doc(id)
    vege_evolution.delete()

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
