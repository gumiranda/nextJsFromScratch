export function reset() {
  return {type: '@rating/RESET'};
}
export function getRequest({page, nextPage = false}) {
  return {type: '@rating/LIST_REQUEST', payload: {page, nextPage}};
}
export function getSuccess({ratingsList, ratingsTotal}) {
  return {
    type: '@rating/LIST_SUCCESS',
    payload: {ratingsList, ratingsTotal},
  };
}
export function getRequestOwner({page, nextPage = false}) {
  return {type: '@rating/LIST_OWNER_REQUEST', payload: {page, nextPage}};
}
export function getSuccessOwner({ratingsList, ratingsTotal}) {
  return {
    type: '@rating/LIST_OWNER_SUCCESS',
    payload: {ratingsList, ratingsTotal},
  };
}
export function getFailureOwner() {
  return {type: '@rating/LIST_OWNER_FAILURE'};
}
