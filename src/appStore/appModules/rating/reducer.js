import produce from 'immer';

const INITIAL_STATE = {
  ratingsLoading: false,
  ratingsList: [],
  ratingsPage: 1,
  ratingsTotal: 0,
  ratingsOwnerLoading: false,
  ratingsOwnerList: [],
  ratingsOwnerPage: 1,
  ratingsOwnerTotal: 0,
};

export default function rating(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@rating/LIST_OWNER_FAILURE': {
        draft.ratingsOwnerLoading = false;
        break;
      }
      case '@rating/LIST_OWNER_SUCCESS': {
        draft.ratingsOwnerLoading = false;
        draft.ratingsOwnerTotal = action.payload.ratingsTotal;
        draft.ratingsOwnerList = action.payload.ratingsList;
        break;
      }
      case '@rating/LIST_OWNER_REQUEST': {
        draft.ratingsOwnerLoading = true;
        draft.ratingsOwnerTotal = 0;
        draft.ratingsOwnerPage = action.payload.page;
        break;
      }
      case '@rating/LIST_SUCCESS': {
        draft.ratingsLoading = false;
        draft.ratingsTotal = action.payload.ratingsTotal;
        draft.ratingsList = action.payload.ratingsList;
        break;
      }
      case '@rating/LIST_REQUEST': {
        draft.ratingsLoading = true;
        draft.ratingsTotal = 0;
        draft.ratingsPage = action.payload.page;
        break;
      }
      case '@rating/RATING_FAILURE': {
        draft.ratingsLoading = false;
        break;
      }
      case '@rating/RATING_SUCCESS': {
        draft.ratingsLoading = false;
        break;
      }
      case '@rating/RATING_REQUEST': {
        draft.ratingsLoading = true;
        break;
      }
      case '@rating/RESET': {
        draft.ratingsLoading = false;
        draft.ratingsList = [];
        draft.ratingsPage = 1;
        draft.ratingsTotal = 0;
        draft.ratingsOwnerLoading = false;
        draft.ratingsOwnerList = [];
        draft.ratingsOwnerPage = 1;
        draft.ratingsOwnerTotal = 0;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.ratingsLoading = false;
        draft.ratingsList = [];
        draft.ratingsPage = 1;
        draft.ratingsTotal = 0;
        draft.ratingsOwnerLoading = false;
        draft.ratingsOwnerList = [];
        draft.ratingsOwnerPage = 1;
        draft.ratingsOwnerTotal = 0;
        break;
      }
      default:
    }
  });
}
