const pool = require('../../connection')

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
        "number" serial,
        sowing_date date,
        creation_date text,
        CONSTRAINT pkey_${data.data.vegetable}_id_plant PRIMARY KEY (id_plant)
    );
    ALTER TABLE ${data.data.vegetable}
        OWNER to diana_carolina;`)

    //inserta nueva verdura
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO ${table} (id, vegetable, creation_date) VALUES ($1, $2, $3)`,
        [data.id, data.data.vegetable, data.creation_date],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
    })
  }
}

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${table} WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)

      let itemOld = result.rows[0].vegetable

      return resolve(
        pool.query(
          `UPDATE ${table} SET vegetable=$1 , creation_date=$2 WHERE id=$3`,
          [data.data.vegetable, data.creation_date, id]
        ) &&
          setTimeout(() => {
            pool.query(
              `ALTER TABLE ${itemOld} RENAME TO ${data.data.vegetable}`
            )
          }, 200) &&
          setTimeout(() => {
            pool.query(`ALTER TABLE ${data.data.vegetable}
               RENAME CONSTRAINT pkey_${itemOld}_id_plant TO pkey_${data.data.vegetable}_id_plant`)
          }, 200)
      )
    })
  })
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}" ORDER BY id ASC`, (err, result) => {
      if (err) return reject(err)

      //obtengo id
      let item = result.rows
        .map((item) => item.id)
        .find((element) => element === id)

      //si el item es igual al id procedo
      if (item) {
        let value = result.rows
          .map((element) => element)
          .filter((element) => element.id === item)

        //y busco el valor del vegetable
        if (value) {
          let total = value[0].vegetable

          //elimino la tabla del vegetable y el vegetable
          return resolve(
            //elimina registro del vegetal de vegetable_plot
            pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id]) &&
              setTimeout(() => {
                //elimina tabla del vegetal
                pool.query(`DROP TABLE ${total}`)
              }, 200),
            setTimeout(() => {
              //elimina registro del vegetal en vegetable
              pool.query(`DELETE FROM "vegetable" WHERE id_vegetable =$1`, [id])
            }, 200)
          )
        }
      }
    })
  })
}

module.exports = {
  insert,
  update,
  remove,
}
