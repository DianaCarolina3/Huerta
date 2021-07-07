const db = {
  vegetable: null,
}

const list = async (table) => {
  return (await db[table]) || []
}

const get = async (table, id) => {
  if (!id) {
    return '[Error] No id'
  }

  let collection = await db[table]
  let filterID = collection.filter((item) => item.id == id)[0]
  return filterID
}

const insert = async (table, data) => {
  if (!db[table]) {
    db[table] = []
  }

  await db[table].push(data)
  return data
}

const update = async (table, data, id) => {
  if (!id) {
    return '[Error] No id'
  }

  if (db[table]) {
    db[table] = []
  }

  let collection = await db[table]
  let filterID = collection.filter((item) => item.id == id)[0]

  if (filterID) {
    return db[table].push(data)
  }
}

const remove = async (table, id) => {
  delete db[table].filter((item) => item.id === id)[0]
}

module.exports = {
  list,
  get,
  insert,
  update,
  remove,
}
