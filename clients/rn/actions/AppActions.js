import Base64 from '../utils/Base64';
import RNFetchBlob from 'react-native-fetch-blob'

const BASE_URL = `https://api.bukalapak.com/v2`;
import {
  ToastAndroid,
  AsyncStorage,
  NetInfo,
  NativeModules,
} from 'react-native';

const FloatingAndroid = NativeModules.FloatingAndroid;

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

export function cacheProductsData(keyword, result) {
  return {
    type: 'CACHE_PRODUCTS_DATA',
    data: {
      keyword,
      result,
    },
  }
}

export function queueAddFavourite(productId) {
  return {
    type: 'QUEUE_ADD_FAVOURITE',
    data: productId,
  }
}

export function queueRemoveFavourite(productId) {
  return {
    type: 'QUEUE_REMOVE_FAVOURITE',
    data: productId,
  }
}

export function clearPendingFavourite() {
  return {
    type: 'CLEAR_PENDING_FAVOURITE',
  }
}

export function setImageId(id) {
  return {
    type: 'SET_IMAGE_ID',
    data: id,
  }
}

export function createImage(imageBase64) {
  return (dispatch, getState) => {
    const userData = getState().app.userData;
    console.log('CREATE IMAGE USER DATA', userData);
    return RNFetchBlob.fetch('POST', 'https://api.bukalapak.com/v2/images.json', {
      'Authorization': 'Basic '+Base64.btoa(`${userData.user_id}:${userData.token}`),
      'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'file', filename : 'avatar-png.png', type:'image/png', data: imageBase64 },
    ]).then(response => {
      var data = JSON.parse(response.data);
      if (data.status == 'OK') {
        dispatch(setImageId(data.id));
      } else {
        ToastAndroid.show(`Gagal upload gambar: ${data.message}`, ToastAndroid.SHORT);
      }
      return data;
    }).catch(err => {
      console.log('ERROR API', err);
    });
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

export function addToCart(product, isConnected) {
  return (dispatch, getState) => {
    const userData = getState().app.userData;
    const carts = getState().app.carts;
    const isFavorited = carts.map(c => c.id).includes(product.id);
    console.log('IDENTITY', userData);

    if (isConnected) {
      if (!isFavorited) {
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
        });
      } else {
        return fetch(`${BASE_URL}/favorites/${product.id}/remove.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+Base64.btoa(`${userData.user_id}:${userData.token}`),
          },
        }).then(res => res.json()).then(data => {
          console.log('REMOVEFROMCART RESP', data);
          if (data.status == 'OK') {
            // dispatch(setCarts(data.cart));
            ToastAndroid.show('Berhasil menghapus item dari favorit', ToastAndroid.SHORT);
            dispatch(fetchCarts());
          } else {
            ToastAndroid.show('Anda belum login! Silakan login terlebih dahulu', ToastAndroid.SHORT);
          }
          return data;
        }).catch(err => {
          console.log('ERROR API', err);
        });
      }
    } else { // not connected
      if (!isFavorited) {
        dispatch(queueAddFavourite(product.id));
        ToastAndroid.show('Produk sudah masuk antrian favorit, menunggu koneksi internet untuk menambahkan...', ToastAndroid.SHORT);
        return Promise.resolve();
      } else {
        dispatch(queueRemoveFavourite(product.id));
        ToastAndroid.show('Produk sudah masuk antrian hapus favorit, menunggu koneksi internet untuk menghapus...', ToastAndroid.SHORT);
        return Promise.resolve();
      }
    }
  }
}

export function fetchProducts(realKeyword, keyword, price, isConnected) {
  return (dispatch, getState) => {
    if (isConnected) {
      console.log('using api in fetchProducts...');
      let url = `${BASE_URL}/products.json?keywords=${keyword}`;
      if (price != 0) url = url + `&price_max=${price}`;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        dispatch(cacheProductsData(realKeyword, data));
        dispatch(setProducts(data.products));
        return data;
      }).catch(err => {
        console.log('ERROR API', err);
      });
    } else {
      console.log('using cache in fetchProducts...');
      // else, retrieve cached data from store
      const cachedProductsData = getState().app.cachedProductsData && getState().app.cachedProductsData[realKeyword];
      if (cachedProductsData != null) {
        console.log('cachedProducts data is', cachedProductsData.products);
        dispatch(setProducts(cachedProductsData.products));
        return Promise.resolve(cachedProductsData);
      } else {
        console.log('ERROR API', 'no cache available');
        return Promise.reject();
      }
    }
  }
}

export function executePendingFavourites() {
  return (dispatch, getState) => {
    const userData = getState().app.userData;
    const pendingAddFavouriteIds = getState().app.pendingAddFavouriteIds;
    const pendingRemoveFavouriteIds = getState().app.pendingRemoveFavouriteIds;

    let addFavPromise = Promise.resolve(true);
    let removeFavPromise = Promise.resolve(true);

    if (pendingAddFavouriteIds && pendingAddFavouriteIds.length > 0) {
      const url = `${BASE_URL}/favorites/bulk_add.json`;
      addFavPromise = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+Base64.btoa(`${userData.user_id}:${userData.token}`),
        },
        body: JSON.stringify({
          products_id: pendingAddFavouriteIds,
        })
      }).then(res => res.json()
      ).then(data => {
        ToastAndroid.show('Produk dalam antrian favorit sudah berhasil ditambahkan!', ToastAndroid.SHORT);
        return true;
      }).catch(err => {
        console.log('ERROR ADD BULK FAVOURITE', err);
        return Promise.reject(false);
      });
    }

    if (pendingRemoveFavouriteIds && pendingRemoveFavouriteIds.length > 0) {
      const url = `${BASE_URL}/favorites/bulk_remove.json`;
      removeFavPromise = fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+Base64.btoa(`${userData.user_id}:${userData.token}`),
        },
        body: JSON.stringify({
          products_id: pendingRemoveFavouriteIds,
        })
      }).then(res => res.json()
      ).then(data => {
        ToastAndroid.show('Produk dalam antrian hapus favorit sudah berhasil dihapus!', ToastAndroid.SHORT);
        return true;
      }).catch(err => {
        console.log('ERROR REMOVE BULK FAVOURITE', err);
        return Promise.reject(false);
      });
    }

    return addFavPromise
      .then(result => {
        return removeFavPromise;
      }).then(result => {
        dispatch(clearPendingFavourite());
        dispatch(fetchCarts());
      });
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
            'Authorization': 'Bearer NM0NCwqMgmNLbd2ABgzTTe8I5mvUNF',
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
