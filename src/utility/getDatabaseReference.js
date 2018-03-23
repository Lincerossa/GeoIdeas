import admin from '../../firebase'


export const getDatabaseMarkersReference = () => {
  const db = admin.database();
  return db.ref(`markers/`)
}

export const removePoint = number => number.replace(/\D+/g, '')


export const getDatabaseLoginReference = typeOfUser => {
  const db = admin.database();
  return db.ref(`login/${typeOfUser}`)
}
