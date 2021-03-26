import produce from 'immer';

const INITIAL_STATE = {
  puppysLoading: false,
  puppysList: [],
  params: {},
};

export default function puppy(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@puppy/LIST_SUCCESS': {
        draft.puppysLoading = false;
        draft.puppysList = action.payload.puppysList;
        break;
      }
      case '@puppy/LIST_REQUEST': {
        draft.puppysLoading = true;
        draft.params = action.payload;
        break;
      }
      case '@puppy/PUPPY_FAILURE': {
        draft.puppysLoading = false;
        break;
      }
      case '@puppy/PUPPY_SUCCESS': {
        draft.puppysLoading = false;
        break;
      }
      case '@puppy/PUPPY_REQUEST': {
        draft.puppysLoading = true;
        break;
      }
      case '@puppy/RESET': {
        draft.puppysLoading = false;
        draft.puppysList = [];
        draft.params = {};
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.puppysLoading = false;
        draft.puppysList = [];
        draft.params = {};

        break;
      }
      default:
    }
  });
}
