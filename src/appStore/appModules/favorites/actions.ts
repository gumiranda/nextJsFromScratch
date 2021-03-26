export function updateFavoritesFailure() {
  return { type: '@favorites/UPDATE_FAVORITES_FAILURE' };
}
export function updateFavoritesRequest(data) {
  return { type: '@favorites/UPDATE_FAVORITES_REQUEST', payload: { data } };
}
export function completeFavoritesRequest(data) {
  return { type: '@favorites/COMPLETE_FAVORITES_REQUEST', payload: { data } };
}
export function updateFavoritesSuccess(favorites) {
  return { type: '@favorites/UPDATE_FAVORITES_SUCCESS', payload: { favorites } };
}
export function getSession() {
  return { type: '@favorites/GET_SESSION' };
}
