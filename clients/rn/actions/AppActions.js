import Base64 from '../utils/Base64';
const BASE_URL = `https://api.bukalapak.com/v2`;

export function setLoggedIn(loggedIn) {
  return {
    type: 'SET_LOGGEDIN',
    data: loggedIn,
  }
}

export function login(username, password) {
  return (dispatch, getState) => {
    console.log('Basic '+Base64.btoa(`${username}:${password}`));
    return fetch(`${BASE_URL}/authenticate.json`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+Base64.btoa(`${username}:${password}`),
      },
    })
    .then(data => {
      console.log('DATA', data);
      return data;
    });
  }
}
