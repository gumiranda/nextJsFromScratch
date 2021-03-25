export function ratingRequest(data) {
  return {type: '@rating/RATING_REQUEST', payload: data};
}

export function ratingSuccess() {
  return {type: '@rating/RATING_SUCCESS'};
}

export function ratingFailure() {
  return {type: '@rating/RATING_FAILURE'};
}
