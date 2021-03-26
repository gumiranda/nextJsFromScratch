import produce from 'immer';

const INITIAL_STATE = {
  favoritesLoading: false,
  favoritesList: [],
  favoritesTotal: 0,
  params: {},
};

export default function favorite(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@favorite/LIST_SUCCESS': {
        draft.favoritesLoading = false;
        draft.favoritesTotal = action.payload.favoritesTotal;
        draft.favoritesList = action.payload.favoritesList;
        break;
      }
      case '@favorite/LIST_REQUEST': {
        draft.favoritesLoading = true;
        draft.favoritesTotal = 0;
        draft.params = action.payload;
        break;
      }
      case '@favorite/FAVORITE_FAILURE': {
        draft.favoritesLoading = false;
        draft.favoritesTotal = 0;
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
        draft.favoritesTotal = 0;
        draft.params = {};
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.favoritesTotal = 0;
        draft.favoritesLoading = false;
        draft.favoritesList = [];
        draft.params = {};
        break;
      }
      default:
    }
  });
}
