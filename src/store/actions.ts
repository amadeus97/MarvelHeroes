import Character from '../types/character';

export const ADD_TO_FAVORITE_LIST = 'ADD_TO_FAVORITE';
export const REMOVE_FROM_FAVORITE_LIST = 'REMOVE_FROM_FAVORITE';

export const addFavorite = (hero: Character) => (dispatch: any) => {
  dispatch({
    type: ADD_TO_FAVORITE_LIST,
    payload: hero,
  });
};

export const removeFavorite = (hero: Character) => (dispatch: any) => {
  dispatch({
    type: REMOVE_FROM_FAVORITE_LIST,
    payload: hero,
  });
};
