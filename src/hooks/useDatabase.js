import { useEffect, useState } from 'react'
import firebase from 'firebase/app'

export const dbRefs = {
  users: '/users',
  items: '/items',
}

const objectToArray = (entities) =>
  Object.entries(entities).reduce(
    (acc, [key, values]) => [...acc, { uid: key, ...values }],
    []
  )

export const useDatabase = (ref) => {
  const addEntity = (entity) => firebase.database().ref(ref).push(entity)

  const removeEntity = (uid) =>
    firebase.database().ref(`${ref}/${uid}`).remove()

  const updateEntity = ({ uid, value }) =>
    firebase.database().ref(`${ref}/${uid}`).set(value)

  const [entities, setEntities] = useState({})
  useEffect(() => {
    firebase
      .database()
      .ref(ref)
      .on('value', (snapshot) => setEntities(snapshot.val() || {}))
  }, [ref])

  return {
    entities: entities,
    entitiesArray: objectToArray(entities),
    addEntity,
    removeEntity,
    updateEntity,
  }
}
