/**
 * Reducer for Notification
 */
const initialState = {
  'open': false,
  'category': 'info',
  'message': ''
};

const notification = (state = initialState, action) => {
  switch(action.type) {
    case 'OPEN_NOTIFICATION':
      const { open, category, message } = action.data;
      return {
        ...state,
        open,
        category,
        message
      }
    default:
      return state;
  }
};

export default notification;