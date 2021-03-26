export function reset() {
  return { type: '@puppy/RESET' };
}
export function getRequest(params) {
  return { type: '@puppy/LIST_REQUEST', payload: params };
}
export function getSuccess({ puppysList }) {
  return {
    type: '@puppy/LIST_SUCCESS',
    payload: { puppysList },
  };
}
