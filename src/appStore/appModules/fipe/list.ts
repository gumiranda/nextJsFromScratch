export function reset() {
  return { type: '@fipe/RESET' };
}
export function getRequest(params) {
  return { type: '@fipe/LIST_REQUEST', payload: params };
}
export function getSuccess({ fipesList }) {
  return {
    type: '@fipe/LIST_SUCCESS',
    payload: { fipesList },
  };
}
