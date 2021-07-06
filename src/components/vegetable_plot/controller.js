let TABLE = 'vegetable_plot'

module.exports = (injetorStore) => {
  let store = injetorStore

  if (!store) {
    store = require('../../database/dummydb')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const get = async (id) => {
    return await store.get(TABLE, id)
  }

  const insert = (data) => {
    const numberID = Math.floor(Math.random(100) * 100)

    let orchard = {
      id: numberID,
      data,
    }
    return store.insert(TABLE, orchard)
  }

  return {
    list,
    get,
    insert,
    // update,
    // remove,
  }
}
