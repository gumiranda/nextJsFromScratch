export function updateUserFailure() {
  return {type: '@user/UPDATE_USER_FAILURE'};
}
export function updateUserRequest(data) {
  return {type: '@user/UPDATE_USER_REQUEST', payload: {data}};
}
export function completeUserRequest(data) {
  return {type: '@user/COMPLETE_USER_REQUEST', payload: {data}};
}
export function updateUserSuccess(user) {
  return {type: '@user/UPDATE_USER_SUCCESS', payload: {user}};
}
export function getSession() {
  return {type: '@user/GET_SESSION'};
}
