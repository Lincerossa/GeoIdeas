import admin from '../../../firebase'

export const LOGIN = 'LOGIN'


const actionUsername = (username, userAlreadyRegistered = false) => ({
  type: LOGIN,
  login: {
    username,
    userAlreadyRegistered,
    userChecked: true,
  }
})


const getUsers = () => {
  const db = admin.database();
  return db.ref("login/users")
}

const findElementInObjectList = (obj,elementToFind) => (
  Object.keys(obj).find(e => e === elementToFind) !== undefined
)


export function handleLogin(username) {
  return (dispatch) => {
    getUsers()
      .on('value', (snapshot) => {
       
        const users = snapshot.val()
        
        const userAlreadyRegistered = findElementInObjectList(users, username)
        
        if (userAlreadyRegistered) {
          const action = actionUsername(username, true);
          dispatch(action)
          return false
        }

        const action = actionUsername(username, false);
        dispatch(action)
        
      }, function (errorObject) {

        console.log("The read failed: " + errorObject.code);

      });
  };
}
