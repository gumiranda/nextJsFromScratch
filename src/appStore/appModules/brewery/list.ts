export function reset() {
  return { type: '@brewery/RESET' };
}
export function getRequest(params) {
  return { type: '@brewery/LIST_REQUEST', payload: params };
}
export function getSuccess({ brewerysList }) {
  return {
    type: '@brewery/LIST_SUCCESS',
    payload: { brewerysList },
  };
}
