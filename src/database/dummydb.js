const db = {
  vegateble: null,
}

const list = async (table) => {
  return (await db[table]) || []
}

const get = async (table, id) => {
  let collection = await list(table)
  return collection.filter((item) => item.id === id)[0] || null
}

const insert = async (table, data) => {
  if (!db[table]) {
    db[table] = []
  }

  await db[table].push(data)
  return data
}

const update = async (table, data, id) => {
  if (db[table]) {
    db[table] = []
  }

  let dataID = await db[table].filter((item) => item.id === id)
  if (dataID === id) {
    return db[table].push(data)
  }
}

const remove = async (table, id) => {
  let collection = (await db[table]) || []
  delete collection.filter((item) => item.id === id)
  return collection.filter((item) => item.id === id)
}

module.exports = {
  list,
  get,
  insert,
  update,
  remove,
}
