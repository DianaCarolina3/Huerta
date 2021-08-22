const TABLE = 'vegetable_evolution'

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
      id_plant: id,
      height_width: body.height_width,
      thick: body.thick,
      date: new Date(body.date),
    }

    return store.update_vege(TABLE, data, id).then(() => data)
  }

  return {
    list,
    get,
    update,
  }
}
