const initialState = {
  loggedIn: false,
  products: [],
  carts: [],
  userData: {},
  loading: false,
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGGEDIN':
      return {
        ...state,
        loggedIn: action.data,
      }
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.data,
      }
    case 'SET_CARTS':
      return {
        ...state,
        carts: action.data,
      }
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.data,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.data
      }
    default:
      return state;
  }
}
