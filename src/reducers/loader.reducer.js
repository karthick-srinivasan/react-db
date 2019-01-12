/**
 * Reducer for Loader/Spinner
 */
const initialState = {
  'isLoading': false
};

const loader = (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: action.status
      }
    default:
      return state;
  }
};

export default loader;