export function favoriteRequest(data) {
  return { type: '@favorite/FAVORITE_REQUEST', payload: data };
}
export function favoriteRemoveRequest(data) {
  return { type: '@favorite/FAVORITE_REMOVE_REQUEST', payload: data };
}

export function favoriteSuccess() {
  return { type: '@favorite/FAVORITE_SUCCESS' };
}

export function favoriteFailure() {
  return { type: '@favorite/FAVORITE_FAILURE' };
}
