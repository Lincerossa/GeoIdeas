import admin from '../../../firebase'

export const LOGIN = 'LOGIN'


const actionUsername = ({ username, userAlreadyRegistered = false }) => ({
  type: LOGIN,
  login: {
    username,
    userAlreadyRegistered,
    userChecked: true,
  }
})


const getDatabaseLoginReference = typeOfUser => {
  const db = admin.database();
  return db.ref(`login/${typeOfUser}`)
}


const setUserAsGuest = (username) => {
  const users = getDatabaseLoginReference('guests');
  users.update({
    [username]: '',
  })
}


const findElementInObjectList = (obj,elementToFind) => (
  Object.keys(obj).find(e => e === elementToFind) !== undefined
)


export function handleLogin(username) {
  return (dispatch) => {
    getDatabaseLoginReference('users')
      .on('value', (snapshot) => {
       
        const users = snapshot.val()
        
        const userAlreadyRegistered = findElementInObjectList(users, username)
        
        if (userAlreadyRegistered) {
          const action = actionUsername({ username, userAlreadyRegistered: true });
          dispatch(action)
          return false
        }
        
        setUserAsGuest(username)
        const action = actionUsername({ username, userAlreadyRegistered: false });
        dispatch(action)

        // qui va avanti


        
      }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
        const action = actionUsername({ username: null, userAlreadyRegistered: false });
        dispatch(action)
      });
  };
}
