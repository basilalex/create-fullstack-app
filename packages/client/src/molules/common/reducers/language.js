const defaultState = {
  lng: null,
  available: null,
};

const languageReducers = (state = defaultState, action) => {
  switch (action.type) {

    case 'SET_LANGUAGE':
      return {
        ...state,
        lng: action.payload,
      };

    case 'SET_INITIAL_LANGUAGE':
      return action.payload;

    default:
      return state;
  }
};

export default languageReducers;

const setLanguage = payload => ({ type: 'SET_LANGUAGE', payload });
const setInitialLanguages = payload => ({ type: 'SET_INITIAL_LANGUAGE', payload });

export { setLanguage, setInitialLanguages };
