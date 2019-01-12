/**
 * Reducer for food form
 */
const initialState = {
  'open': false,
  'data': []
};

const form = (state = initialState, action) => {
  switch(action.type) {
    case 'OPEN_FORM':
      return {
        ...state,
        open: action.status,
        data: action.data
      }
    default:
      return state;
  }
};

export default form;