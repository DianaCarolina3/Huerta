const pool = require('../../../connection')

const insert = async (table, data) => {
  //si existe la verdura no la crea
  if (
    (await pool.query(`SELECT * FROM ${table} WHERE vegetable=$1`, [
      data.data.vegetable,
    ])) === data.data.vegetable
  ) {
    return 'Values Existing'
  } else {
    //crea tabla de verdura
    await pool.query(`CREATE TABLE ${data.data.vegetable}
    (
        id_plant character varying,
        "number" integer,
        live boolean,
        sowing_date date,
        last_review date,
        status character varying,
        plague boolean,
        plague_type character varying,
        transplant character varying,
        plant_in_one integer,
        place character varying,
        "request" text,
        harvest date,
        note text,
        photo text,
        CONSTRAINT pkey_${data.data.vegetable}_id_plant PRIMARY KEY (id_plant)
    );
    ALTER TABLE ${data.data.vegetable}
        OWNER to diana_carolina;`)

    //iserta nueva verdura
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO ${table} (id, vegetable) VALUES ($1, $2)`,
        [data.id, data.data.vegetable],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows)
        }
      )
    })
  }
}

const update = async (table, data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${table} WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)

      let item = result.rows[0].vegetable

      return resolve(
        pool.query(`UPDATE ${table} SET vegetable=$1 WHERE id=$2`, [
          data.data.vegetable,
          id,
        ]) &&
          setTimeout(() => {
            pool.query(`ALTER TABLE ${item} RENAME TO ${data.data.vegetable}`)
          }, 500)
      )
    })
  })
}

const remove = async (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}" ORDER BY id ASC`, (err, result) => {
      if (err) return reject(err)

      let item = result.rows[0].vegetable

      return resolve(
        pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id]) &&
          setTimeout(() => {
            pool.query(`DROP TABLE ${item}`)
          }, 500)
      )
    })
  })
}

module.exports = {
  insert,
  update,
  remove,
}
