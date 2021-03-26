export function signInRequest(data) {
  return { type: '@auth/SIGN_IN_REQUEST', payload: data };
}
export function signInRequestFB(data) {
  return { type: '@auth/SIGN_IN_FB_REQUEST', payload: data };
}
export function signInSuccess(token, user) {
  return { type: '@auth/SIGN_IN_SUCCESS', payload: { token, user } };
}
export function signUpRequest(data) {
  return { type: '@auth/SIGN_UP_REQUEST', payload: data };
}
export function signFailure() {
  return { type: '@auth/SIGN_FAILURE' };
}
export function signOut() {
  return { type: '@auth/SIGN_OUT' };
}
export function setPushId(payload) {
  return { type: '@auth/SET_PUSH_ID', payload };
}
