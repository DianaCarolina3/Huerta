const pool = require('../../connection')

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    //crea la function del trigger
    pool.query(
      `CREATE OR REPLACE FUNCTION function_vege()
      RETURNS TRIGGER AS
          $BODY$
          BEGIN
          INSERT INTO ${data.vegetable} (creation_date, id_plant, sowing_date) VALUES
          (current_timestamp, new.ID, new.sowing_date);
          RETURN NEW;
          END;
          $BODY$
          LANGUAGE plpgsql;`,
      (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      }
    )

    //inserta valores en tablas creando una verdura
    setTimeout(() => {
      pool.query(
        `INSERT INTO ${table} (id_vegetable, id, sowing_date)
      VALUES ($1, $2, $3)`,
        [data.id_vegetable, data.id, data.sowing_date],
        (err, result) => {
          if (err) return reject(err)

          resolve(result.rows)
        }
      )
      setTimeout(() => {
        pool.query(
          `INSERT INTO vegetable_data(
          id_plant, live)
          VALUES ($1, $2)`,
          [data.id, true]
        )
      }, 100)
      pool.query(
        `INSERT INTO vegetable_info(
        id_plant, request, note)
        VALUES ($1, $2, $3)`,
        [data.id, 'Ninguna', 'Ninguna']
      )
      pool.query(
        `INSERT INTO vegetable_photo(
        id_plant)
        VALUES ($1)`,
        [data.id]
      )
      pool.query(
        `INSERT INTO vegetable_place(
        id_plant)
        VALUES ($1)`,
        [data.id]
      )
      pool.query(
        `INSERT INTO vegetable_plague(
        id_plant)
        VALUES ($1)`,
        [data.id]
      )
      pool.query(
        `INSERT INTO vegetable_transplant(
        id_plant, transplant)
        VALUES ($1, $2)`,
        [data.id, false]
      )
      pool.query(
        `INSERT INTO vegetable_evolution(
        id_plant)
        VALUES ($1)`,
        [data.id]
      )
    }, 100)
  })
}

const update = async (table, data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${table} SET id_vegetable=$1 , sowing_date=$2 WHERE id=$3`,
      [data.id_vegetable, data.sowing_date, id],
      (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      }
    )

    pool.query(
      `UPDATE ${data.string} SET sowing_date=$1 WHERE id_plant=$2`,
      [data.sowing_date, id],
      (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      }
    )
  })
}

const remove = (table, id, data) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)

      resolve(result.rows)
    })

    pool.query(
      `DELETE FROM ${data}
    WHERE id_plant = $1;`,
      [id],
      (err, result) => {
        if (err) return reject(err)

        resolve(result.rows)
      }
    )
  })
}

module.exports = {
  insert,
  update,
  remove,
}
