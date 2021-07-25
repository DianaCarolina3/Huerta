const firebase = require('firebase')
const config = require('../../config')

firebase.initializeApp({
  apikey: config.firebase.apikey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  database_url: config.firebase.database_url,
  storage_bucket: config.firebase.storage_bucket,
  messaging_sender_id: config.firebase.messaging_sender_id,
  app_id: config.firebase.app_id,
  measurement_id: config.firebase.measurement_id,
})

const db = firebase.firestore()

db.collection('users')
  .add({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  })
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id)
  })
  .catch((error) => {
    console.error('Error adding document: ', error)
  })

db.collection('users')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
    })
  })
