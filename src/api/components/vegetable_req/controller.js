const TABLE = 'vegetable_req'

module.exports = function (injectorStore) {
  let store = injectorStore

  if (!store) {
    store = require('../../../database/firebase/service')
  }

  const list = () => {
    return store.list(TABLE)
  }

  const get = (id) => {
    return store.get(TABLE, id)
  }

  const update = (id, body) => {
    const data = {
      id: id,
      request: body.request,
      note: body.note,
    }

    return store.update_vege(TABLE, data, id).then(() => data)
  }

  return {
    list,
    get,
    update,
  }
}
