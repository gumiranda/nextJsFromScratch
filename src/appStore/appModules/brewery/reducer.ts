import produce from 'immer';

const INITIAL_STATE = {
  brewerysLoading: false,
  brewerysList: [],
  params: {},
};

export default function brewery(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@brewery/LIST_SUCCESS': {
        draft.brewerysLoading = false;
        draft.brewerysList = action.payload.brewerysList;
        break;
      }
      case '@brewery/LIST_REQUEST': {
        draft.brewerysLoading = true;
        draft.params = action.payload;
        break;
      }
      case '@brewery/BREWERY_FAILURE': {
        draft.brewerysLoading = false;
        break;
      }
      case '@brewery/BREWERY_SUCCESS': {
        draft.brewerysLoading = false;
        break;
      }
      case '@brewery/BREWERY_REQUEST': {
        draft.brewerysLoading = true;
        break;
      }
      case '@brewery/RESET': {
        draft.brewerysLoading = false;
        draft.brewerysList = [];
        draft.params = {};
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.brewerysLoading = false;
        draft.brewerysList = [];
        draft.params = {};

        break;
      }
      default:
    }
  });
}
