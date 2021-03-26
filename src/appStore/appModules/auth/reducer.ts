import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  loadingFb: false,
  pushId: 'semPushId',
  pushToken: 'semPushId',
};
export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.loadingFb = false;
        break;
      }
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_FB_REQUEST': {
        draft.loadingFb = true;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        draft.loadingFb = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SET_PUSH_ID': {
        draft.pushId = action.payload.pushId;
        draft.pushToken = action.payload.pushToken;
        break;
      }
      default:
    }
  });
}
