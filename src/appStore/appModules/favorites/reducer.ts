import produce from 'immer';

const INITIAL_STATE = {
  favorite: null,
  loading: false,
  favoritesLoading: false,
  favoritesList: [],
  favoritesPage: 1,
  favoritesTotal: 0,
};

export default function favorite(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        draft.favorite = action.payload.favorite;
        break;
      }
      case '@favorite/UPDATE_FAVORITE_SUCCESS': {
        draft.loading = false;
        draft.favorite = action.payload.favorite;
        break;
      }
      case '@favorite/UPDATE_FAVORITE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@favorite/GET_SESSION': {
        draft.loading = true;
        break;
      }
      case '@favorite/COMPLETE_FAVORITE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@favorite/UPDATE_FAVORITE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@favorite/LIST_SUCCESS': {
        draft.favoritesLoading = false;
        draft.favoritesTotal = action.payload.favoritesTotal;
        draft.favoritesList = action.payload.favoritesList;
        break;
      }
      case '@favorite/LIST_REQUEST': {
        draft.favoritesLoading = true;
        draft.favoritesTotal = 0;
        draft.favoritesPage = action.payload.page;
        break;
      }
      case '@favorite/LIST_FAILURE': {
        draft.favoritesLoading = false;
        break;
      }
      case '@favorite/RESET': {
        draft.favoritesLoading = false;
        draft.favoritesList = [];
        draft.favoritesPage = 1;
        draft.favoritesTotal = 0;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.favorite = null;
        draft.favoritesList = [];
        draft.favoritesPage = 1;
        draft.favoritesTotal = 0;
        break;
      }
      default:
    }
  });
}
