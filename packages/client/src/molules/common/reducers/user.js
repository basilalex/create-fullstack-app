const defaultState = {
  user: undefined
};

const userReducers = (state = defaultState, action) => {
  switch (action.type) {

    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'REMOVE_USER':
      return {
        ...state,
        user: undefined
      };

    default:
      return state;
  }
};

export default userReducers;

const setUser = user => ({ type: 'SET_USER', payload: user });
const removeUser = () => ({ type: 'REMOVE_USER' });

export { setUser, removeUser };
