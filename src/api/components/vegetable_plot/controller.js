const { v4: uuidv4 } = require('uuid')
let TABLE = 'vegetable_plot'

module.exports = (injetorStore) => {
  let store = injetorStore

  if (!store) {
    store = require('../../../database/firebase/service')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const get = async (id) => {
    return await store.get(TABLE, id)
  }

  const insert = (data) => {
    const id = uuidv4()

    let orchard = {
      id,
      data,
      creation_date: new Date(),
    }
    return store.insert_vege(TABLE, orchard).then(() => orchard)
  }

  const update = (data, id) => {
    let orchard = {
      id,
      data,
      creation_date: new Date(),
    }
    return store.update_vege(TABLE, orchard, id).then(() => orchard)
  }

  const remove = (id) => {
    return store.remove_vege(TABLE, id)
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
  }
}
