const TABLE = 'vegetable_data'

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
      live: body.live,
      status: body.status,
      last_review: new Date(body.last_review),
    }

    return store.update_vege(TABLE, data, id).then(() => data)
  }

  return {
    list,
    get,
    update,
  }
}
