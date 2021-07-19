const { v4: uuidv4 } = require('uuid')
const TABLE = 'vegetable'

module.exports = function (injectorStore) {
  let store = injectorStore

  if (!store) {
    store = require('../../../database/dummydb')
  }

  const list = (table) => {
    return store.list(table)
  }

  const get = (table, id) => {
    return store.get(table, id)
  }

  const insert = (IDvege, body) => {
    const data = {
      vegetable: body.id,
      id_vegetable: IDvege,
      id: body.id + '-' + uuidv4(),
      sowing_date: body.sowing_date,
    }

    return store.insert_vege(TABLE, data).then(() => data)
  }

  const update = (table, body, id) => {
    let string = id.slice(0, -37)

    const data = {
      string,
      id_vegetable: body.id_vegetable,
      sowing_date: body.sowing_date,
    }

    return store.update_vege(table, data, id).then(() => data)
  }

  const remove = (table, id) => {
    let string = id.slice(0, -37)
    return store.remove_vege(table, id, string)
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
  }
}
