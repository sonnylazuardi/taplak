const initialState = {
  loggedIn: false,
  products: [],
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
    default:
      return state;
  }
}
