import {ADD_TO_FAVORITE_LIST, REMOVE_FROM_FAVORITE_LIST} from './actions';

const initialState: any = {
  favorites: [],
};

function heroesReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TO_FAVORITE_LIST:
      console.log('adicionando...');
      return {...state, favorites: [...state.favorites, action.payload]};
    case REMOVE_FROM_FAVORITE_LIST:
      console.log('removendo...');
      return {
        ...state,
        favorites: state.favorites.filter(
          (hero: any) => hero.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default heroesReducer;
