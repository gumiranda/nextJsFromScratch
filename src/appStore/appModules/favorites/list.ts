export function getFailure() {
  return { type: '@favorites/LIST_FAILURE' };
}
export function reset() {
  return { type: '@favorites/RESET' };
}
export function getRequest({ page, nextPage = false }) {
  return { type: '@favorites/LIST_REQUEST', payload: { page, nextPage } };
}
export function getSuccess({ favoritessList, favoritessTotal }) {
  return { type: '@favorites/LIST_SUCCESS', payload: { favoritessList, favoritessTotal } };
}
