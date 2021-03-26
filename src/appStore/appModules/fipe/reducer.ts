import produce from 'immer';

const INITIAL_STATE = {
  fipesLoading: false,
  fipesList: [],
  params: {},
};

export default function fipe(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@fipe/LIST_SUCCESS': {
        draft.fipesLoading = false;
        draft.fipesList = action.payload.fipesList;
        break;
      }
      case '@fipe/LIST_REQUEST': {
        draft.fipesLoading = true;
        draft.params = action.payload;
        break;
      }
      case '@fipe/FIPE_FAILURE': {
        draft.fipesLoading = false;
        break;
      }
      case '@fipe/FIPE_SUCCESS': {
        draft.fipesLoading = false;
        break;
      }
      case '@fipe/FIPE_REQUEST': {
        draft.fipesLoading = true;
        break;
      }
      case '@fipe/RESET': {
        draft.fipesLoading = false;
        draft.fipesList = [];
        draft.params = {};
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.fipesLoading = false;
        draft.fipesList = [];
        draft.params = {};

        break;
      }
      default:
    }
  });
}
