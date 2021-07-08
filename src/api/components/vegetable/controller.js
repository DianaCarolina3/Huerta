module.exports = function (injectorStore) {
  let store = injectorStore

  if (!store) {
    store = require('../../../database/dummydb')
  }

  const list = (table) => {
    return store.listPlant(table)
  }

  const get = (table, id) => {
    return store.getPlant(table, id)
  }

  const remove = (table, id) => {
    return store.remove(table, id)
  }

  return {
    list,
    get,
    remove,
  }
}
