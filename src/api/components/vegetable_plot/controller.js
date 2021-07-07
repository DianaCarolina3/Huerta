const { v4: uuidv4 } = require('uuid')
let TABLE = 'vegetable_plot'

module.exports = (injetorStore) => {
  let store = injetorStore

  if (!store) {
    store = require('../../../database/dummydb')
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
    }
    return store.insert(TABLE, orchard).then(() => orchard)
  }

  const update = (data, id) => {
    let orchard = {
      id,
      data,
    }
    return store.update(TABLE, orchard, id).then(() => orchard)
  }

  const remove = (id) => {
    return store.remove(TABLE, id)
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
  }
}
