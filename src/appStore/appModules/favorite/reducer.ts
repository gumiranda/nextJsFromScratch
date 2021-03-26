import produce from 'immer';

const INITIAL_STATE = {
  favoritesLoading: false,
  favoritesList: [],
  params: {},
};

export default function favorite(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@favorite/LIST_SUCCESS': {
        draft.favoritesLoading = false;
        draft.favoritesList = action.payload.favoritesList;
        break;
      }
      case '@favorite/LIST_REQUEST': {
        draft.favoritesLoading = true;
        draft.params = action.payload;
        break;
      }
      case '@favorite/FAVORITE_FAILURE': {
        draft.favoritesLoading = false;
        break;
      }
      case '@favorite/FAVORITE_SUCCESS': {
        draft.favoritesLoading = false;
        break;
      }
      case '@favorite/FAVORITE_REQUEST': {
        draft.favoritesLoading = true;
        break;
      }
      case '@favorite/RESET': {
        draft.favoritesLoading = false;
        draft.favoritesList = [];
        draft.params = {};
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.favoritesLoading = false;
        draft.favoritesList = [];
        draft.params = {};

        break;
      }
      default:
    }
  });
}
