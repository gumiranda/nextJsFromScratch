import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  userLogged: {},
  loading: false,
};
export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.signed = true;
        draft.userLogged = action.payload;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        draft.signed = false;
        draft.userLogged = {};
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.userLogged = {};
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
