import Base64 from '../utils/Base64';
const BASE_URL = `https://api.bukalapak.com/v2`;
import {ToastAndroid, AsyncStorage} from 'react-native';

export function setLoggedIn(loggedIn) {
  return {
    type: 'SET_LOGGEDIN',
    data: loggedIn,
  }
}

export function setUserData(userData) {
  return {
    type: 'SET_USER_DATA',
    data: userData,
  }
}

export function setUserProfile(userProfile) {
  return {
    type: 'SET_USER_PROFILE',
    data: userProfile,
  }
}

export function setProducts(products) {
  return {
    type: 'SET_PRODUCTS',
    data: products,
  }
}

export function setCarts(carts) {
  return {
    type: 'SET_CARTS',
    data: carts,
  }
}

export function setLoading(loading) {
  return {
    type: 'SET_LOADING',
    data: loading,
  }
}

export function fetchUserProfile(userData) {
  return (dispatch, getState) => {
    if (!userData) return;
    return fetch(`${BASE_URL}/users/${userData.user_id}/profile.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(data => {
      if (data.status == 'OK') {
        AsyncStorage.setItem('userProfile', JSON.stringify(data.user));
        dispatch(setUserProfile(data.user))
      } else {
        ToastAndroid.show('Anda belum login! Silakan login terlebih dahulu', ToastAndroid.SHORT);
      }
      return data;
    }).catch(err => {
      console.log('ERROR API', err);
    })
  }
}

export function fetchCarts() {
  return (dispatch, getState) => {
    const userData = getState().app.userData;
    console.log('IDENTITY', userData);

    return fetch(`${BASE_URL}/favorites.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+Base64.btoa(`${userData.user_id}:${userData.token}`),
      },
    }).then(res => res.json()).then(data => {
      if (data.status == 'OK') {
        dispatch(setCarts(data.products))
      } else {
        ToastAndroid.show('Anda belum login! Silakan login terlebih dahulu', ToastAndroid.SHORT);
      }
      return data;
    }).catch(err => {
      console.log('ERROR API', err);
    })
  }
}

export function addToCart(product) {
  return (dispatch, getState) => {
    const userData = getState().app.userData;
    console.log('IDENTITY', userData);

    return fetch(`${BASE_URL}/favorites/${product.id}/add.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+Base64.btoa(`${userData.user_id}:${userData.token}`),
      },
    }).then(res => res.json()).then(data => {
      console.log('ADDTOCART RESP', data);
      if (data.status == 'OK') {
        // dispatch(setCarts(data.cart));
        ToastAndroid.show('Berhasil menambahkan item ke favorit', ToastAndroid.SHORT);
        dispatch(fetchCarts());
      } else {
        ToastAndroid.show('Anda belum login! Silakan login terlebih dahulu', ToastAndroid.SHORT);
      }
      return data;
    }).catch(err => {
      console.log('ERROR API', err);
    })
  }
}

export function fetchProducts(keyword, price) {
  return (dispatch, getState) => {
    let url = `${BASE_URL}/products.json?keywords=${keyword}`;
    if (price != 0) url = url + `&price_max=${price}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      dispatch(setProducts(data.products));
      return data;
    }).catch(err => {
      console.log('ERROR API', err);
    })
  }
}

export function login(username, password) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    console.log('Basic '+Base64.btoa(`${username}:${password}`));
    return fetch(`${BASE_URL}/authenticate.json`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+Base64.btoa(`${username}:${password}`),
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.status == 'OK') {
        dispatch(setLoggedIn(true));
        dispatch(setUserData(data));
        dispatch(setLoading(false));
      } else {
        console.log('LOGIN ERROR', data);
        ToastAndroid.show('Username atau password salah! Silakan coba dalam beberapa saat lagi.', ToastAndroid.SHORT);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 10000);
      }
      return data;
    }).catch(err => {
      console.log('ERROR API', err);
    })
  }
}

export function translate(text, reverse) {
    return (dispatch, getState) => {
        return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170527T163546Z.e211ae426f222d43.5102a116aae034b5c3faf284de3b488848a2fdce&text=${text}&lang=${reverse ? 'id' : 'en'}`, {
          method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
          console.log('DATA', data);
          return data;
        });
    }
}


export function apiAi(text) {
    return (dispatch, getState) => {

        return fetch("https://api.api.ai/v1/query?v=20150910", {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer cd072cca99d54c698665f1405924293e',
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            query:text,
            lang: 'en',
            sessionId: '1234567890'
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log('DATA', data);
          return data;
        });
    }
}

export function clarifyAi(base64) {
    return (dispatch, getState) => {

        return fetch("https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs", {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer mddPWzze90Dn2kvpTvemOTY5XYCCct',
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            "inputs": [
            {
              "data": {
                "image": {
                  "base64": base64
                }
              }
            }
          ]
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log('DATA', data);
          return data;
        });
    }
}
