export function reset() {
  return { type: '@favorite/RESET' };
}
export function getRequest(params) {
  return { type: '@favorite/LIST_REQUEST', payload: params };
}
export function getSuccess({ favoritesList, favoritesOfUser, favoritesTotal }) {
  return {
    type: '@favorite/LIST_SUCCESS',
    payload: { favoritesList, favoritesOfUser, favoritesTotal },
  };
}
