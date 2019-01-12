/**
 * Reducer for food menus
 */
const initialState = {
  'foodList': [],
  'isError': false,
  'errorMessage': ''
};

const food = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_FOOD':
      return {
        ...state,
        foodList: action.payLoad
      }
    case 'ERROR':
      return {
        ...state,
        isError: true,
        errorMessage: action.message
      }
    default:
      return state;
  }
};

export default food;